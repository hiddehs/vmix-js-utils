# vMix-js-utils

[![package json version](https://img.shields.io/github/package-json/v/jensstigaard/vmix-js-utils.svg)](https://www.github/jensstigaard/vmix-js-utils)
[![npm version](https://badge.fury.io/js/vmix-js-utils.svg)](https://www.npmjs.com/package/vmix-js-utils)
[![npm downloads](https://img.shields.io/npm/dt/vmix-js-utils)](https://www.npmjs.com/package/vmix-js-utils)

vMix API utility for Javascript can be used in either front or backend applications and includes the following modules:
 - [TcpTally](#tcp-tally)
 - [XmlApiDataParser](#xml-api-data-parser)
 - [XmlAudio](#xml-audio)
 - [XmlInputMapper](#xml-input-mapper)
 - [XmlOverlayChannels](#xml-overlay-channels)
 - [XmlTransitions](#xml-transitions)

It is recommended to import the package as a NPM package. Alternatively you can download the source code and included it as a library manually.

## OBS - NodeJS utility for vMix
**Note**: The NodeJS utility for communicating with vMix is branched out in its own repository/package - See [node-vmix](https://github.com/jensstigaard/node-vmix) for more info. This package is only for NodeJS applications.

---
Simple use
```javascript
import { ApiDataParser, InputMapper } from 'vmix-js-utils'

```

# Purpose
The utilities consists of several modules. Each can be used on its own, but usually it makes more sense to make it interplay with some of the other modules.

The modules are coded as classes, meaning that they are constructed with specific parameters, e.g. that the instanciation of a connection needs a host and a port. 

# Description of modules


## Tcp Tally
Interprets the tally info from the TCP service.

`TcpTally.extractSummary(tallyString: string)` *(static)*: Extract summary of tally info. 
**Format:**
```javascript
// Tally info summary
{
	program: Number[],
	preview: Number[],
	numberOfInputs: Number
}
```

`TcpTally.extractInputs(tallyString: string)` *(static)*: Extract (full) info of inputs from tally. 
**Format: Number[]**

---

## Xml Api Data Parser
Parses the raw XML data from vMix into parsed and structured XML that can be more easily manipulated in JavaScript.
All full XML responses from the API needs to be used to convert the content to a proper XML DOM object.

`XmlApiDataParser.parse(xmlStringRaw)` *(static)*: Parse raw XML string content to XML document.

---

## Xml Audio
Audio info from master and busses from the vMix instance state.

`XmlAudio.all(xmlDocument)` *(static)*: Extract info for all audio channels (master + busses) from XML content.

`XmlAudio.busses(xmlDocument)` *(static)*: Extract all audioBusses from XML content.

`XmlAudio.master(xmlDocument)` *(static)*: Extract audio master channel info from XML content.

---

## Xml General State
Get general state info from the vMix instance.

Constructor inputting complete xmlDocument from vMix API
```const vMixGeneralState = new vMixGeneralState(xmlDocument)```

Update with new data
```.update(xmlDocument)```

`.softwareVersion()` - `string` - Software version of vMix instance

`.softwareEdition()` - `string` - Software edition of vMix instance

`.recording()` - `boolean` - Is vMix instance recording?

`.multiCoder()` - `boolean` - Is multiCorder module recording in vMix instance

`.playList()` - `boolean` - Is playlist module active in vMix instance

`.fullscreen()` - `boolean` - Is fullscreen active in vMix instance

---

## Xml Input Mapper
Maps the inputs from the vMix instance state to JSON objects.

`XmlInputMapper.extractInputsFromXML(xmlDocument)` *(static)*: Extract all inputs from raw XML data using XPath.

`XmlInputMapper.mapInput(xmlDocument, wantedAttributes?)` *(static)*: Map single input from XML content to JSON object.

`XmlInputMapper.mapInputs(xmlDocument, wantedAttributes?)` *(static)*: Map all inputs from XML content to JSON objects.

`XmlInputMapper.mapTallyInfo(xmlDocument, wantedAttributes?)` *(static)*: Map all (extracted) inputs to JSON objects.

---


## Xml Overlay Channels
`XmlOverlayChannels.extract(xmlDocument)` *(static)* - Returns a object of overlay channels state read from XML data. 
**Format:**
```javascript
// Overlay channels
{
	1: { inputNumber: Number|null, inPreview: Boolean },
	2: { inputNumber: Number|null, inPreview: Boolean },
	3: { inputNumber: Number|null, inPreview: Boolean },
	4: { inputNumber: Number|null, inPreview: Boolean },
	5: { inputNumber: Number|null, inPreview: Boolean },
	6: { inputNumber: Number|null, inPreview: Boolean },
}
```

---

## Xml Transitions
`XmlTransitions.extract(xmlDocument)` *(static)* - Returns a object of transitions state read from XML data. 
**Format:**
```javascript
// Transitions
{
	1: { effect: String, duration: Number },
	2: { effect: String, duration: Number },
	3: { effect: String, duration: Number },
	4: { effect: String, duration: Number },
}
```

---


# Installation and use

## As a dependency using npm
The utilities are published at npmjs, meaning that you can easily add the utilities as a dependency in your frontend project.
Found here: https://www.npmjs.com/package/vmix-js-utils
```sh
npm install vmix-js-utils --save # or 'yarn add vmix-js-utils'
```

In your code the simplest way to import the modules is the following:

```javascript
const { XmlApiDataParser, XmlGeneralState } = require('vmix-js-utils')

// ...
```

You are also able to import all of the modules as a gathered variable, less elegant way:

```javascript
const vMixUtils = require('vmix-js-utils')

// ...
```


# Standalone project / Fork
The source code is written in TypeScript, and ported to javascript (including types for TypeScript support) to allow it to be used as a npm package.

The code can be cloned and tested as needed from the source code.

```sh
git clone https://github.com/jensstigaard/vmix-js-utils.git
cd vmix-js-utils
```
Install dependencies
```sh
npm install # or 'yarn'
```
Compile TypeScript source code to JavaScript code
```sh
npm build # or 'yarn build'
```
Run tests
```sh
npm test # or 'yarn test'
```


# Examples

*Work in progress.*

### XML Input mapper
- [XML input mapper (all attributes)](./examples/xml-input-mapper.js)
- [XML input mapper (attribute selection)](./examples/xml-input-mapper-selective.js)


# Authors
Jens Grønhøj Stigaard - <jens@stigaard.info> (http://jens.stigaard.info)


# Contribution
You are more than welcome to contribute to the repository!


# Roadmap
 - More examples
 - More tests
 - Perhaps more functionality
