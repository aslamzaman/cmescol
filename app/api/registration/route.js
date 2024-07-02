import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';
import { partnerDropdown, submitDropdown, quarterDropdown, regionDropdown, genderDropdown, disabilityDropdown, highestEducationDropdown, maritalDropdown, employeeDropdown, religionDropdown, languageDropdown, deviceDropdown, villageDropdown } from '@/lib/dropdown';

import { formatedDate, myAge } from '@/lib/utils';


export const POST = async (Request) => {
    try {
        const registration = await Request.json();
      //  console.log(registration);



        const workbook = await XlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet("Sheet1").name("Worksheet");
        //----------------------------------------------------------------------------------------------

        const WorksheetOptions0 = workbook.addSheet("WorksheetOptions0");
        partnerDropdown.forEach((item, index) => {
            WorksheetOptions0.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions0.cell(`B${index + 1}`).value(item.num);
        });
        const WorksheetOptions1 = workbook.addSheet("WorksheetOptions1");
        submitDropdown.forEach((item, index) => {
            WorksheetOptions1.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions1.cell(`B${index + 1}`).value(item.num);
        });
        const WorksheetOptions3 = workbook.addSheet("WorksheetOptions3");
        quarterDropdown.forEach((item, index) => {
            WorksheetOptions3.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions3.cell(`B${index + 1}`).value(item.num);
        });

        const WorksheetOptions6 = workbook.addSheet("WorksheetOptions6");
        regionDropdown.forEach((item, index) => {
            WorksheetOptions6.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions6.cell(`B${index + 1}`).value(item.num);
        });
        const WorksheetOptions10 = workbook.addSheet("WorksheetOptions10");
        genderDropdown.forEach((item, index) => {
            WorksheetOptions10.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions10.cell(`B${index + 1}`).value(item.num);
        });

        const WorksheetOptions12 = workbook.addSheet("WorksheetOptions12");
        disabilityDropdown.forEach((item, index) => {
            WorksheetOptions12.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions12.cell(`B${index + 1}`).value(item.num);
        });

        const WorksheetOptions14 = workbook.addSheet("WorksheetOptions14");
        highestEducationDropdown.forEach((item, index) => {
            WorksheetOptions14.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions14.cell(`B${index + 1}`).value(item.num);
        });

        const WorksheetOptions16 = workbook.addSheet("WorksheetOptions16");
        maritalDropdown.forEach((item, index) => {
            WorksheetOptions16.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions16.cell(`B${index + 1}`).value(item.num);
        });

        const WorksheetOptions18 = workbook.addSheet("WorksheetOptions18");
        employeeDropdown.forEach((item, index) => {
            WorksheetOptions18.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions18.cell(`B${index + 1}`).value(item.num);
        });

        const WorksheetOptions20 = workbook.addSheet("WorksheetOptions20");
        religionDropdown.forEach((item, index) => {
            WorksheetOptions20.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions20.cell(`B${index + 1}`).value(item.num);
        });


        const WorksheetOptions22 = workbook.addSheet("WorksheetOptions22");
        languageDropdown.forEach((item, index) => {
            WorksheetOptions22.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions22.cell(`B${index + 1}`).value(item.num);
        });

        const WorksheetOptions24 = workbook.addSheet("WorksheetOptions24");
        deviceDropdown.forEach((item, index) => {
            WorksheetOptions24.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions24.cell(`B${index + 1}`).value(item.num);
        });

        const WorksheetOptions26 = workbook.addSheet("WorksheetOptions26");
        villageDropdown.forEach((item, index) => {
            WorksheetOptions26.cell(`A${index + 1}`).value(`${item.name}`);
            WorksheetOptions26.cell(`B${index + 1}`).value(item.num);
        });

        // Hide the sheet with the dropdown values

        WorksheetOptions0.hidden(true);
        WorksheetOptions1.hidden(true);
        WorksheetOptions3.hidden(true);
        WorksheetOptions6.hidden(true);
        WorksheetOptions10.hidden(true);
        WorksheetOptions12.hidden(true);
        WorksheetOptions14.hidden(true);
        WorksheetOptions16.hidden(true);
        WorksheetOptions18.hidden(true);
        WorksheetOptions20.hidden(true);
        WorksheetOptions22.hidden(true);
        WorksheetOptions24.hidden(true);
        WorksheetOptions26.hidden(true);



        //----------------------------------------------------------------------------------------------

        // Set data validation for the range C4:C9 in Sheet1
        const helper = registration.helper;
        const data = registration.data;

        sheet.range(`A4:A${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions0!$A$1:$A$8',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range(`B4:B${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions1!$A$1:$A$157',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range(`D4:D${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions3!$A$1:$A$4',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range(`G4:G${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: `WorksheetOptions6!$A$1:$A$477`,
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });


        sheet.range(`K4:K${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions10!$A$1:$A$3',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });


        sheet.range(`M4:M${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions12!$A$1:$A$6',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });



        sheet.range(`O4:O${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions14!$A$1:$A$7',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });



        sheet.range(`Q4:Q${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions16!$A$1:$A$7',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range(`S4:S${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions18!$A$1:$A$4',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range(`U4:U${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions20!$A$1:$A$4',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });


        sheet.range(`W4:W${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions22!$A$1:$A$8',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range(`Y4:Y${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions24!$A$1:$A$4',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });

        sheet.range(`AA4:AA${data.length + 3}`).dataValidation({
            type: 'list',
            formula1: 'WorksheetOptions26!$A$1:$A$1002',
            allowBlank: false,
            showInputMessage: false,
            showErrorMessage: false
        });




        sheet.range("A1:D1").merged(true);
        sheet.cell('A1').value("Partner information").style({ fill: '5b92e5', horizontalAlignment: 'center', verticalAlignment: 'center' });

        sheet.range("E1:AB1").merged(true);
        sheet.cell('E1').value("Participant's information").style({ fill: '5b92e5', horizontalAlignment: 'center', verticalAlignment: 'center' });


        sheet.cell('A2').value("Partner name: *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('B2').value("Submitted by: *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('C2').value("Date submitted: *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('D2').value("Reporting period: *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('E2').value("Learner ID *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('F2').value("Registration Date *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });


        sheet.cell('G2').value("Please write the region/district in which the registration took place *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('H2').value("Full name *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('I2').value("DoB *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('J2').value("Age *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('K2').value("Gender *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('L2').value("Person with disability *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('M2').value("Nature of disability *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('N2').value("Parents full name (both if possible) *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('O2').value("Highest level of education *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('P2').value("If Highest level of education Other (please specify):").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('Q2').value("What is your marital status? *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('R2').value("If marital status Other (please specify):").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('S2').value("What is your employment status? *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('T2').value("If employment status Other (please specify):").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('U2').value("What is your religion? *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('V2').value("If religion Other (please specify):").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('W2').value("What language/s do you speak? *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('X2').value("If languages Other (please specify):").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('Y2').value("Do you own any device? If yes, please select:").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('Z2').value("If it is mobile phone, write the number:").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('AA2').value("Community / Village *").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell('AB2').value("Comments from partner").style({ fill: 'bfdbf5', horizontalAlignment: 'center', verticalAlignment: 'center' });



        sheet.range("A3:AB3").style({ fill: 'bfdbf5' });
        sheet.column("A").width(46);
        sheet.column("B").width(22);
        sheet.column("C").width(17);
        sheet.column("D").width(18.5);
        sheet.column("E").width(15);
        sheet.column("F").width(18);
        sheet.column("G").width(64);
        sheet.column("H").width(17);
        sheet.column("I").width(11.5);
        sheet.column("J").width(6.5);
        sheet.column("K").width(9.5);
        sheet.column("L").width(22.5);
        sheet.column("M").width(20);
        sheet.column("N").width(35);
        sheet.column("O").width(25.5);
        sheet.column("P").width(50);
        sheet.column("Q").width(28);
        sheet.column("R").width(36);
        sheet.column("S").width(32.5);
        sheet.column("T").width(42);
        sheet.column("U").width(22.5);
        sheet.column("V").width(30.5);
        sheet.column("W").width(30.5);
        sheet.column("X").width(32.5);
        sheet.column("Y").width(41);
        sheet.column("Z").width(37);
        sheet.column("AA").width(33.5);
        sheet.column("AB").width(25);

        const learnerId = helper.sl;
        const sortName = [
            { id: "suruj", name: "SRJ", area: '   Tangail (Dhaka, Bangladesh, Asia)' },
            { id: "gobratola", name: "GOB", area: '   Nawabganj (Rajshahi, Bangladesh, Asia)' },
            { id: "jaldhaka", name: "JAL", area: '   Nilphamari (Rangpur, Bangladesh, Asia)' },
            { id: "jointapur", name: "JNP", area: '   Sylhet (Sylhet, Bangladesh, Asia)' },
            { id: "deuty", name: "DUT", area: '   Rangpur (Rangpur, Bangladesh, Asia)' },
            { id: "khaserhat", name: "KHT", area: '   Patuakhali (Barisal, Bangladesh, Asia)' },
            { id: "damkura", name: "DMK", area: '   Pabna (Rajshahi, Bangladesh, Asia)' }
        ]
        /*
                {
                    "id": 1719908669990,
                    "name": "Mst. Maunjera Khatun",
                    "dob": "2024-07-02",
                    "gender": "Female",
                    "disability": "yes",
                    "disabilityNature": "Mobility",
                    "fmName": "Md.Badsa Alom , Sirin Begum ",
                    "edn": "Secondary",
                    "isMarried": "Single",
                    "employeement": "Unemployed",
                    "religion": "Muslim",
                    "device": "Basic mobile phone",
                    "mobile": "01720025151",
                    "village": "Itakumari Union Khamar Barabhita"
                  }
        */


        data.forEach((item, i) => {
            const unitSortName = sortName.find(sn => sn.id === helper.unit);

            sheet.cell(`A${i + 4}`).value('CMES - Centre for Mass Education in Science (CMES)');
            sheet.cell(`B${i + 4}`).value(`${helper.user}`);
            sheet.cell(`C${i + 4}`).value(`${formatedDate(new Date())}`);
            sheet.cell(`D${i + 4}`).value(`${helper.period}`);
            sheet.cell(`E${i + 4}`).value(`CMES-${unitSortName.name}-0${parseInt(learnerId) + i}`);
            sheet.cell(`F${i + 4}`).value(`${helper.dt}`);
            sheet.cell(`G${i + 4}`).value(`${unitSortName.area}`);
            sheet.cell(`H${i + 4}`).value(`${item.name}`);
            sheet.cell(`I${i + 4}`).value(`${formatedDate(item.dob)}`);
            sheet.cell(`J${i + 4}`).value(`${myAge(item.dob)}`);
            sheet.cell(`K${i + 4}`).value(`${item.gender}`);
            sheet.cell(`L${i + 4}`).value(`${item.disability}`);
            sheet.cell(`M${i + 4}`).value(`${item.disabilityNature === 'Not Applicable' ? ' ' : item.disabilityNature}`);
            sheet.cell(`N${i + 4}`).value(`${item.fmName}`);
            sheet.cell(`O${i + 4}`).value(`${item.edn}`);
            sheet.cell(`P${i + 4}`).value(" ");
            sheet.cell(`Q${i + 4}`).value(`${item.isMarried}`);
            sheet.cell(`R${i + 4}`).value(" ");
            sheet.cell(`S${i + 4}`).value(`${item.employeement}`);
            sheet.cell(`T${i + 4}`).value(" ");
            sheet.cell(`U${i + 4}`).value(`${item.religion}`);
            sheet.cell(`V${i + 4}`).value(" ");
            sheet.cell(`W${i + 4}`).value("Bengali");
            sheet.cell(`X${i + 4}`).value("");
            sheet.cell(`Y${i + 4}`).value(`${item.device}`);
            sheet.cell(`Z${i + 4}`).value(`${item.mobile}`);
            sheet.cell(`AA${i + 4}`).value(`${item.village}`);
            sheet.cell(`AB${i + 4}`).value(" ");

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