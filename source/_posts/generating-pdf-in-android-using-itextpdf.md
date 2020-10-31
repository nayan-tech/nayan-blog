---
title: Generating Pdf the way you want, in Android using itextpdf
date: 2020-08-23 05:45:58
author: Ashish Jajoria
categories:
- ["Android"]
tags: 
- frontend
- android
- kotlin
- itext
- iTextPDF
- pdf
- generate pdf
- Ashish Jajoria
---

We all must have got requirement to generate PDFs in our Android Application. Well, here is a quick guide on how you can start generating the PDFs your own way without any limits on Andoid device itself.

![iTextPDF](/blog/Android/generating-pdf-in-android-using-itextpdf/itext-logo.png)

## NOTE: Get read/write permissions on Android before invoke of PDF generation code

## Lets start generating PDF step by step:-

1: Add **com.itextpdf:itext7-core:7.1.11** library to your app level gradle file

```groovy
implementation 'com.itextpdf:itext7-core:7.1.11'
```

2:  First Create an instance of PDF document

```kotlin
val pdfDocument = PdfDocument(PdfWriter("Your File Location"))
```

3: Now supply this instance to create `com.itextpdf.layout.Document` instance

```kotlin
val document = Document(pdfDocument)
```

4: Draw some text and style that in your own way

```kotlin
val document = Document(pdfDocument)

val text = Paragraph("My Text")
document.add(text)

val boldText = Paragraph("My Styled Text")
boltText.setBold()
document.add(boldText)

val sizedText = Paragraph("My Sized Text")
sizedText.setFontSize(20.0f)
document.add(sizedText)

val coloredText = Paragraph("My Sized Text")
coloredText.setFontColor(ColorConstants.RED)
document.add(coloredText)

val alignedText = Paragraph("My Sized Text")
alignedText.setTextAlignment(TextAlignment.CENTER)
document.add(alignedText)

document.close()
```

5: Adding a space/gap before and after drawing a text

```kotlin
val document = Document(pdfDocument)

val textWithoutSpace1 = Paragraph("My Text")
textWithoutSpace1.setMargins(10f, 10f, 10f, 10f)
document.add(textWithoutSpace1)

val textWithSpace = Paragraph("My Spaced Text")
textWithSpace.setMargins(10f, 10f, 10f, 10f)
document.add(textWithSpace)

val textWithoutSpace2 = Paragraph("My Text")
textWithoutSpace2.setMargins(10f, 10f, 10f, 10f)
document.add(textWithoutSpace2)

document.close()
```

6: Generate Output file

```kotlin
//This will create a file at your fileLocation specified while creating PdfDocument instance
document.close()
```

## Drawing tables:-

1: Create table instance

```kotlin
val pdfDocument = PdfDocument(PdfWriter("Your File Location"))
val document = Document(pdfDocument)

// This will create a table instance with weighted column width
val table = Table(UnitValue.createPercentArray(floatArrayOf(8f, 23f, 15f, 15f, 12f, 12f, 15f))).useAllAvailableWidth()
```

1: Draw Table using an Array/List/ArrayList/MutableList

```kotlin
val pdfDocument = PdfDocument(PdfWriter("Your File Location"))
val document = Document(pdfDocument)

val table = Table(UnitValue.createPercentArray(floatArrayOf(8f, 23f, 15f, 15f, 12f, 12f, 15f))).useAllAvailableWidth()

//Add Header Cells
table.addHeaderCell(Cell().add(Paragraph("Date").setTextAlignment(TextAlignment.CENTER)))
table.addHeaderCell(Cell().add(Paragraph("Job Name").setTextAlignment(TextAlignment.CENTER)))
table.addHeaderCell(Cell().add(Paragraph("Job Size").setTextAlignment(TextAlignment.CENTER)))
table.addHeaderCell(Cell().add(Paragraph("Job Type").setTextAlignment(TextAlignment.CENTER)))
table.addHeaderCell(Cell().add(Paragraph("Quantity").setTextAlignment(TextAlignment.CENTER)))
table.addHeaderCell(Cell().add(Paragraph("Rate").setTextAlignment(TextAlignment.CENTER)))
table.addHeaderCell(Cell().add(Paragraph("Amount").setTextAlignment(TextAlignment.CENTER)))

for (entry in entries) {
  table.addCell(Cell().add(Paragraph(shortDateFormat.format(entry.createdOn)).setTextAlignment(TextAlignment.CENTER)))
  table.addCell(entry.getJobName())
  table.addCell(Cell().add(Paragraph(entry.jobSize).setTextAlignment(TextAlignment.CENTER)))
  table.addCell(Cell().add(Paragraph(entry.getJobType().replace("Pouch", "")).setTextAlignment(TextAlignment.CENTER)))
  table.addCell(Cell().add(Paragraph(entry.quantity).setTextAlignment(TextAlignment.CENTER)))
  table.addCell(Cell().add(Paragraph(entry.rate).setTextAlignment(TextAlignment.CENTER)))
  table.addCell(Cell().add(Paragraph(entry.amount).setTextAlignment(TextAlignment.RIGHT)))
}

document.add(table)

document.close()
```

## Change Page Size for pdfDocument

Set your desired page size to `pdfDocument`'s `defaultPageSize`

```kotlin
val pdfDocument = PdfDocument(PdfWriter(fileLocation))
pdfDocument.defaultPageSize = PageSize.A4
```

## References:-

1. [iTextPDF Examples](https://kb.itextpdf.com/home/it7kb/examples)

## Some good reads you may like:-

1. [Override Devise Auth Token Controllers](https://nayan.co/blog/Ruby-on-Rails/override-devise-auth-token-controllers/)
2. [Paytm Gateway Integration](https://nayan.co/blog/Ruby-on-Rails/paytm-gateway-integration/)

p.s. Nayan is a platform that offers high precision services for traffic monitoring and road safety. Check out our [website](https://nayan.co)
