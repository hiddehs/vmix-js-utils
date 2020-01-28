export default {

	LastPreset: {
		description: 'Load the last preset.',
	},

	OpenPreset: {
		description: 'Load preset from the specified Filename.',
		parameters: {
			Value: {
				type: String,
				description: 'Filename'
			}
		}
	},

	SavePreset: {
		description: 'Save preset to the specified Filename.',
		parameters: {
			Value: {
				type: String,
				description: 'Filename'
			}
		}
	}
}
