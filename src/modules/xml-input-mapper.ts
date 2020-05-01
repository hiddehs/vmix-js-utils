// Imports
import xpath, { SelectedValue } from 'xpath'

// Types
import { TallySummary } from '../types/tcp'

export default class XmlInputMapper {

    /**
     * Extract inputs XML from full XML document using XPath
     * @param {Node} xmlContent
     */
    static extractInputsFromXML(xmlContent: Node): SelectedValue[] {
        return xpath.select("//vmix/inputs/input", xmlContent)
    }

    /**
     * Map inputs
     * @param xmlInputs
     * @param wantedAttributes
     */
    static mapInputs(xmlInputs: SelectedValue[], wantedAttributes: string | string[] = '*') {

        // Map all data from raw input
        var xmlInputsMapped = xmlInputs.map((input: any) => {
            const output: any = {}

            // Map all base attributes of input
            for (let i in input.attributes) {
                const attribute = input.attributes[i]

                // Guard attribute not having name, being a function or nodeValue being a function
                if (!attribute.name || typeof attribute === 'function' || attribute.nodeValue === 'function' || typeof attribute.name !== 'string') {
                    continue
                }

                // Only add the attribute to the output object if it is mandatory or desired by user
                if (
                    ['key', 'type'].includes(attribute.name)
                    || wantedAttributes === '*'
                    || wantedAttributes.includes(attribute.name)
                ) {
                    output[attribute.name] = attribute.nodeValue
                }
            }

            if (
                ['GT', 'Xaml'].includes(output.type)
                &&
                (
                    wantedAttributes === '*'
                    ||
                    wantedAttributes.includes('fields')
                )
            ) {
                const fields = []
                for (let i in input.childNodes) {
                    const entry = input.childNodes[i]
                    if (entry.localName && ['image', 'text'].includes(entry.localName)) {
                        const obj: any = {
                            type: entry.localName,
                            value: entry.firstChild ? entry.firstChild.nodeValue.trim() : null
                        } // Build advanced fields of object from its advanced attributes

                        // Map attributes
                        if (
                            entry.attributes &&
                            (typeof entry.attributes === 'object' || Array.isArray(entry.attributes))) {
                            for (let name in entry.attributes) {
                                let attribute = entry.attributes[name]
                                if (attribute.localName === 'name') {
                                    obj[attribute.name] = attribute.nodeValue
                                }
                            }
                        }

                        fields.push(obj)
                    }
                }
                output.fields = fields
            }

            return output
        })
        // Make a dictionary
        let inputsDictionary: any = {}
        xmlInputsMapped.forEach((input: any) => {
            inputsDictionary[input.key] = input
        })

        return inputsDictionary
    }

    static mapTallyInfo(xmlContent: Node): TallySummary {
        const inputInProgram: number = this.extractProgramFromXML(xmlContent)
        const inputInPreview: number = this.extractPreviewFromXML(xmlContent)

        const numberOfInputs = XmlInputMapper.extractInputsFromXML(xmlContent).length
        if (inputInPreview > numberOfInputs) {
            throw new Error(`Invalid preview input number... ${inputInPreview} of ${numberOfInputs} inputs`)
        }
        if (inputInProgram > numberOfInputs) {
            throw new Error(`Invalid program input number... ${inputInProgram} of ${numberOfInputs} inputs`)
        }

        return {
            program: [inputInProgram],
            preview: [inputInPreview],

            numberOfInputs
        }
    }


    /**
     * Extract active in prgoram XML from full XML document using XPath
     * @param {Node} xmlContent
     */
    static extractProgramFromXML(xmlContent: Node): number {
        const node: Node = xpath.select("//vmix/active", xmlContent, true) as Node

        if (!node) {
            throw new Error('Could not find active program...')
        }

        return Number(node.lastChild!.nodeValue)
    }

    /**
     * Extract preview XML from full XML document using XPath
     * @param {Node} xmlContent
     */
    static extractPreviewFromXML(xmlContent: Node): number {
        const node: Node = xpath.select("//vmix/preview", xmlContent, true) as Node

        if (!node) {
            throw new Error('Could not find preview program...')
        }

        return Number(node.lastChild!.nodeValue)
    }
}