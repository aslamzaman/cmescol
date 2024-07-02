import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';

import { options0 } from '@/lib/data/attendance/options0';
import { options1 } from '@/lib/data/attendance/options1';
import { options2 } from '@/lib/data/attendance/options2';
import { options3 } from '@/lib/data/attendance/options3';
import { options4 } from '@/lib/data/attendance/options4';


export const POST = async (Request) => {
    try {
        const data = await Request.json();

        //    const newData = {data: datas, searchData: newObject};
        // DATA --------------------------------------

        const qurrterName = data.searchData.quarter;
        const userName = data.searchData.user;
        const dt = data.searchData.dt;

        
        const participant = data.data;
        
        const workbook = await XlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet("Sheet1").name("Worksheet");
        //----------------------------------------------------------------------------------------------
        
        const WorksheetOptions0 = workbook.addSheet("WorksheetOptions0");
        options0.forEach((item, index) => {
            WorksheetOptions0.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions0.cell(`B${index + 1}`).value(item.num);
        });
        const WorksheetOptions1 = workbook.addSheet("WorksheetOptions1");
        options1.forEach((item, index) => {
            WorksheetOptions1.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions1.cell(`B${index + 1}`).value(item.num);
        });
        const WorksheetOptions2 = workbook.addSheet("WorksheetOptions2");
        options2.forEach((item, index) => {
            WorksheetOptions2.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions2.cell(`B${index + 1}`).value(item.num);
        });
        
        const classDate = `Labour market relevant lifelihood skills training for women/girls and men/boys ${dt}`;
        const WorksheetOptions3 = workbook.addSheet("WorksheetOptions3");
        options3.push({ name: classDate, num: 219381 });
        options3.forEach((item, index) => {
            WorksheetOptions3.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions3.cell(`B${index + 1}`).value(item.num);
        });
        const WorksheetOptions4 = workbook.addSheet("WorksheetOptions4");
        options4.forEach((item, index) => {
            WorksheetOptions4.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions4.cell(`B${index + 1}`).value(item.num);
        });


        // Hide the sheet with the dropdown values
        WorksheetOptions0.hidden(true);
        WorksheetOptions1.hidden(true);
        WorksheetOptions2.hidden(true);
        WorksheetOptions3.hidden(true);
        WorksheetOptions4.hidden(true);
        //----------------------------------------------------------------------------------------------

        // Set data validation for the range C4:C9 in Sheet1
        const perticipantLength = participant.length;

        sheet.range(`A4:A${perticipantLength + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions0!$A$1:$A$9',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range(`B4:B${perticipantLength + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions1!$A$1:$A$157',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range(`C4:C${perticipantLength + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions2!$A$1:$A$4',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range(`D4:D${perticipantLength + 3}`).dataValidation({
            type: 'list',
            formula1: `WorksheetOptions3!$A$1:$A$${options3.length}`,
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });


        sheet.range(`E4:E${perticipantLength + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions4!$A$1:$A$12491',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });


        sheet.range("A1:C1").merged(true);
        sheet.cell('A1').value("Partner's information").style({ fill: '5b92e5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.range("D1:E1").merged(true);
        sheet.cell('D1').value("Attendance sheet").style({ fill: '5b92e5', horizontalAlignment: 'center', verticalAlignment: 'center' });

        sheet.cell('A2').value("Partner name").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('B2').value("Submitted by: *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('C2').value("Reporting period: *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('D2').value("Event *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('E2').value("Participant *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });

        sheet.range("A3:E3").style({ fill: 'bfdbf5' });
        sheet.column("A").width(48);
        sheet.column("B").width(30);
        sheet.column("C").width(18);
        sheet.column("D").width(80);
        sheet.column("E").width(35);


        participant.forEach((item, i) => {
            sheet.cell(`A${i + 4}`).value('CMES - Centre for Mass Education in Science (CMES)');
            sheet.cell(`B${i + 4}`).value(`${userName}`);
            sheet.cell(`C${i + 4}`).value(`${qurrterName}`);
            sheet.cell(`D${i + 4}`).value(`${classDate}`);
            sheet.cell(`E${i + 4}`).value(`${participant[i].code}`);
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