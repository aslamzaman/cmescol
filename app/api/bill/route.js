import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';
import { formatRevalidate } from 'next/dist/server/lib/revalidate';
import { formatedDate } from '@/lib/utils';

const unitArray = [
    {
        id: "damkura",
        unit: "Damkura, Rajshahi",
        short: "DAM"
    },
    {
        id: "suruj",
        unit: "Suruj, Tangail",
        short: "SRJ"
    },
    {
        id: "jaldhaka",
        unit: "Jaldhaka, Nilphamari",
        short: "JAL"
    },
    {
        id: "khaserhat",
        unit: "Khaserhat, Patuakhali",
        short: "KHT"
    },
    {
        id: "gobratola",
        unit: "Gobratola, Chapainwabganj",
        short: "GOB"
    },
    {
        id: "jointapur",
        unit: "Jointapur, Sylhet",
        short: "JNP"
    }
]

export const GET = async (Request) => {
    const ip = Request.ip;
    return NextResponse.json({ ip: ip });
};


export const POST = async (Request) => {
    try {
        const data = await Request.json();
        /*
                    imageDatas: imageDatas,
                    unit: unit,
                    activity: activity,
                    taka: taka,
                    detail: detail,
                    dt:dt,
                    q:q
        */
        console.log(data);

        const items = data.imageDatas;
        const workbook = await XlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet("Sheet1").name("Worksheet");
        //--------------------------------------------


        sheet.range("A1:D1").merged(true);
        sheet.cell('A1').value("Centre for Mass Education in Science (CMES)").style({ fontSize: 10, horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.range("A2:D2").merged(true);
        sheet.cell('A2').value("Bill Summery").style({ fontSize: 10, bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.range("A3:D3").merged(true);
        sheet.cell('A3').value(`Activity: ${data.activity}`).style({ fontSize: 10, horizontalAlignment: 'center', verticalAlignment: 'center' });

        const untName = unitArray.find(u => u.id === data.unit);
        sheet.range("A5:D5").merged(true);
        sheet.cell('A5').value(`Unit: ${untName.unit}`).style({ fontSize: 10, horizontalAlignment: 'left', verticalAlignment: 'center' });

        sheet.cell("A6").value("SL").style({ fontSize: 10, border: true, bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell("B6").value("Description").style({ fontSize: 10, border: true, bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell("C6").value("Taka(BDT)").style({ fontSize: 10, border: true, bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell("D6").value("PDF Bill Attested").style({ fontSize: 10, border: true, bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });



        const bills = data.detail;
        const splitBlill = bills.split("+");

        let rowNo = 0;
        items.forEach((item, i) => {
            const unitShort = untName.short; // From line 67
            const billNoTwoDigitString = "0" + (i + 1);
            const billNoTwoDigit = billNoTwoDigitString.substring(billNoTwoDigitString.length-2, 2);
            const str = `CMES-${unitShort}-${data.q}-${formatedDate(data.dt)}-Bill-${billNoTwoDigit}`

            sheet.cell(`A${i + 7}`).value(`${i + 1}`).style({ fontSize: 10, border: true, horizontalAlignment: 'center', verticalAlignment: 'center' });
            sheet.cell(`B${i + 7}`).value(str).style({ fontSize: 10, border: true, horizontalAlignment: 'left', verticalAlignment: 'center' });
            sheet.cell(`C${i + 7}`).value(parseFloat(splitBlill[i])).style({ fontSize: 10, border: true, horizontalAlignment: 'center', verticalAlignment: 'center' });
            rowNo = i + 7;
        })

        // Total
        sheet.cell(`B${rowNo + 1}`).value("Total").style({ fontSize: 10, border: true, bold: true, horizontalAlignment: 'Left', verticalAlignment: 'center' });
        sheet.cell(`C${rowNo + 1}`).formula(`SUM(C7:C${rowNo})`).style({ fontSize: 10, border: true, bold: true, horizontalAlignment: 'center', verticalAlignment: 'center' });

        // Remarks
        sheet.range(`D7:D${rowNo}`).merged(true);
        sheet.cell('D7').value(`PdfBill-CMES-${untName.short}-${data.q}-${data.dt}.pdf`).style({ fontSize: 10, border: true, wrapText: true, horizontalAlignment: 'center', verticalAlignment: 'center' });
        // Border
        sheet.cell(`A${rowNo + 1}`).style({ border: true });
        sheet.cell(`D${rowNo + 1}`).style({ border: true });




        sheet.column("A").width(6);
        sheet.column("B").width(36);
        sheet.column("C").width(13);
        sheet.column("D").width(35);



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
