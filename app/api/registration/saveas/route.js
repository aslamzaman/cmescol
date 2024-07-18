import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';



export const POST = async (Request) => {
    try {
        const data = await Request.json();
       // console.log(registration);

        const workbook = await XlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet("Sheet1").name("Worksheet");
        //----------------------------------------------------------------------------------------------
        data.forEach((item, i) => {
            sheet.cell(`A${i + 1}`).value(`${item.id}`);
            sheet.cell(`B${i + 1}`).value(`${item.name}`);
            sheet.cell(`C${i + 1}`).value(`${item.dob}`);
            sheet.cell(`D${i + 1}`).value(`${item.gender}`);
            sheet.cell(`E${i + 1}`).value(`${item.disability}`);
            sheet.cell(`F${i + 1}`).value(`${item.disabilityNature}`);
            sheet.cell(`G${i + 1}`).value(`${item.fmName}`);
            sheet.cell(`H${i + 1}`).value(`${item.edn}`);
            sheet.cell(`I${i + 1}`).value(`${item.isMarried}`);
            sheet.cell(`J${i + 1}`).value(`${item.employeement}`);
            sheet.cell(`K${i + 1}`).value(`${item.religion}`);
            sheet.cell(`L${i + 1}`).value(`${item.device}`);
            sheet.cell(`M${i + 1}`).value(`${item.mobile}`);
            sheet.cell(`N${i + 1}`).value(`${item.village}`);
        })

        // Generate the Excel file as a buffer
        const buffer = await workbook.outputAsync();

        // Set headers for file download
        const filename = "output.xlsx"; // Set your desired filename here
        const headers = new Headers();
        headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        headers.set('Content-Disposition', `attachment; filename=${filename}`);

        // Return the buffer directly for download
        return new NextResponse(buffer, {
            status: 200,
            headers: headers
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Error generating Excel file", err }, { status: 500 });
    }
};