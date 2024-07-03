import React, { useState } from "react";
import { TextEn, BtnSubmit, TextDt, DropdownEn } from "@/components/Form";
import { addItem, getItems } from "@/lib/LocalDatabase";
import { formatedDate, myAge } from "@/lib/utils";
import { sortVillage } from "@/lib/utils";

const Add = ({ message }) => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [disability, setDisability] = useState('');
    const [disabilityNature, setDisabilityNature] = useState('');
    const [fmName, setFmName] = useState('');
    const [edn, setEdn] = useState('');
    const [isMarried, setIsMarried] = useState('');
    const [employeement, setEmployeement] = useState('');
    const [religion, setReligion] = useState('');
    const [device, setDevice] = useState('');
    const [mobile, setMobile] = useState('');
    const [village, setVillage] = useState('');

    const [show, setShow] = useState(false);

    const [villages, setVillages] = useState([]);
    const [saveId, setSaveId] = useState("");
    const [msg, setMsg] = useState("");

    const resetVariables = () => {
        setName('');
        setDob(formatedDate(new Date()));
        setGender('');
        setDisability('');
        setDisabilityNature('');
        setFmName('');
        setEdn('');
        setIsMarried('');
        setEmployeement('');
        setReligion('');
        setDevice('');
        setMobile('');
        setVillage('');
    }


    const showAddForm = () => {
        setShow(true);
        resetVariables();
        const helper = getItems('helper');
        const unit = helper.data.unit;
        console.log(unit)
        const v = sortVillage(unit);
        setVillages(v);
        setSaveId(Date.now());
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const createObject = () => {
        return {
            id: saveId,
            name: name,
            dob: dob,
            gender: gender,
            disability: disability,
            disabilityNature: disability === 'no' ? 'Not Applicable' : disabilityNature,
            fmName: fmName,
            edn: edn,
            isMarried: isMarried,
            employeement: employeement,
            religion: religion,
            device: device,
            mobile: mobile,
            village: village
        }
    }


    const saveHandler = (e) => {
        e.preventDefault();
        const getHelper = getItems('helper');
        const age = myAge(dob);

        if (getHelper.data.perticipant === "perticipant") {
            if (age < 13 || age > 56) {
                setMsg("Age limit of the participant should be 13 to 56 years. Please change date of birth.");
                return false;
            }
        } else {
            if (age < 20 || age > 80) {
                setMsg("Age limit of the arent/community participant should be 20 to 80 years. Please change date of birth.");
                return false;
            }
        }

        if (disability === 'yes') {
            if (disabilityNature === 'Not Applicable') {
                setMsg("Please change disability nature field");
                return false
            }
        }


        if(mobile.length < 11){
            setMsg("Mobile number is not correct.");
            return false 
        }
        //-------------------------------------------



        try {
            const newObject = createObject();
            const response = addItem('registration', newObject);
            message(`${response.message}: ${saveId}`);
        } catch (error) {
            console.error("Error saving registration data:", error);
            message("Error saving registration data.");
        } finally {
            setShow(false);
        }
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 lg:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
                            <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-6 pb-6 text-black">                            
                            <form onSubmit={saveHandler}>
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextEn Title="Name" Id="name" Change={e => setName(e.target.value)} Value={name} Chr={100} />
                                    <TextDt Title="Date of Birth" Id="dob" Change={e => setDob(e.target.value)} Value={dob} />
                                    <DropdownEn Title="Gender" Id="gender" Change={e => setGender(e.target.value)} Value={gender}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </DropdownEn>
                                    <DropdownEn Title="Disability" Id="disability" Change={e => setDisability(e.target.value)} Value={disability}>
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </DropdownEn>

                                    <DropdownEn Title="Disability Nature" Id="disabilityNature" Change={e => setDisabilityNature(e.target.value)} Value={disabilityNature}>
                                        <option value="Physical">Physical</option>
                                        <option value="Speech">Speech</option>
                                        <option value="Mobility">Mobility</option>
                                        <option value="Not Applicable">Not Applicable</option>
                                    </DropdownEn>

                                    <TextEn Title="Father, Mother Name" Id="fmName" Change={e => setFmName(e.target.value)} Value={fmName} Chr={150} />

                                    <DropdownEn Title="Education" Id="edn" Change={e => setEdn(e.target.value)} Value={edn}>
                                        <option value="Primary">Primary</option>
                                        <option value="Secondary">Secondary</option>
                                        <option value="Post-secondary">Post-secondary</option>
                                    </DropdownEn>

                                    <DropdownEn Title="Marital Status" Id="isMarried" Change={e => setIsMarried(e.target.value)} Value={isMarried}>
                                        <option value="Legally married">Legally married</option>
                                        <option value="Single">Single</option>
                                        <option value="Divorced or separated">Divorced or separated</option>
                                    </DropdownEn>


                                    <DropdownEn Title="Employeement" Id="employeement" Change={e => setEmployeement(e.target.value)} Value={employeement}>
                                        <option value="Unemployed">Unemployed</option>
                                        <option value="Employed">Employed</option>
                                        <option value="Other">Other</option>
                                    </DropdownEn>


                                    <DropdownEn Title="Religion" Id="religion" Change={e => setReligion(e.target.value)} Value={religion}>
                                        <option value="Muslim">Muslim</option>
                                        <option value="Hindu">Hindu</option>
                                    </DropdownEn>

                                    <DropdownEn Title="Device" Id="device" Change={e => setDevice(e.target.value)} Value={device}>
                                        <option value="Basic mobile phone">Basic mobile phone</option>
                                        <option value="Smart phone">Smart phone</option>
                                    </DropdownEn>
                     

                                    <TextEn Title="Mobile" Id="mobile" Change={e => setMobile(e.target.value)} Value={mobile} Chr={11} />


                                    <DropdownEn Title="Village" Id="village" Change={e => setVillage(e.target.value)} Value={village}>
                                        {villages.length ? villages.map(village => <option value={village.name} key={village.id}>{village.name}</option>) : null}
                                    </DropdownEn>
                                </div>

                                    <p className="mt-2 text-start text-red-500">** {msg}</p>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeAddForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            )}
            <button onClick={showAddForm} className="px-1 py-1 bg-blue-500 hover:bg-blue-700 rounded-md transition duration-500" title="Add New">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    )
}
export default Add;

