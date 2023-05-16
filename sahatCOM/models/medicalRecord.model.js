const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema(
	{
		pdfFile: Buffer,
		patientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Patient',
		},
	},
	{ timestamps: true },
);

const PdfModel = mongoose.model('Pdf', pdfSchema);

module.exports = PdfModel;
