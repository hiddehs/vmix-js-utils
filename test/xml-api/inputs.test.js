// File system
const fs = require('fs')
const path = require('path')

// Using assert library as test-library
const assert = require('assert')

// Import the modules
const { XmlApi: vMixXmlApi } = require('../../dist/index')

const TEST_DATA_FILE_PATH = './_data/inputs.xml'

// Read XML file as utf-8
const rawXmlData = fs.readFileSync(path.resolve(__dirname, TEST_DATA_FILE_PATH), 'utf-8')

const xmlDocument = vMixXmlApi.DataParser.parse(rawXmlData)
const xmlInputs = vMixXmlApi.Inputs.extractInputsFromXML(xmlDocument)

// Parse to wanted format
const inputs = vMixXmlApi.Inputs.map(xmlInputs
)

describe('xml-api-inputs', function () {
    it('should have 5 inputs from the sample data', function () {
        // console.log(inputsList)

        // Assert the inputs were found
        assert.strictEqual(inputs.length, 5, 'Did not see expected number of inputs')
    })

    it('should have 2 default inputs from the sample data which is both blank', function () {

        // Assert the inputs were found
        assert.strictEqual(inputs[0].type, 'Blank')
        assert.strictEqual(inputs[1].type, 'Blank')
    })

    it('should have input 1 as active preview', function () {
        const preview = vMixXmlApi.Inputs.extractPreviewInputNumber(xmlDocument)

        // Assert the preview input number
        assert.strictEqual(preview, 1)
    })

    it('should have input 2 as active program', function () {
        const program = vMixXmlApi.Inputs.extractProgramInputNumber(xmlDocument)

        // Assert the program input number
        assert.strictEqual(program, 2)
    })

    it('should have a GT title on input 3 with title fields extracted', function () {
        const titleInput = inputs[2]

        // console.log(titleInput)

        // Assert the input were found and with specific type
        assert.strictEqual(titleInput.title, 'Scoreboard 3- Lineup 12.gtzip')
        assert.strictEqual(titleInput.type, 'GT')
        // Assert all title fields loaded
        assert.strictEqual(titleInput.fields.length, 27)
        // Assert all title fields loaded
        assert.strictEqual(titleInput.fields[0].name, 'Team Lineups.Text')
    })

    it('should have a Xaml title on input 5 with title fields extracted', function () {
        const titleInput = inputs[4]

        // console.log(titleInput)

        // Assert the input were found and with specific type
        assert.strictEqual(titleInput.type, 'Xaml')
        // Assert all title fields loaded
        assert.strictEqual(titleInput.fields.length, 8)
        // Assert all title fields loaded
        assert.strictEqual(titleInput.fields[0].name, 'FromUsername')
    })
})