import React, { useState } from "react";
import { TextEn, BtnSubmit, TextDt, DropdownEn } from "@/components/Form";
import { updateItem, getItems } from "@/lib/LocalDatabase";
import { sortVillage } from "@/lib/utils";
import { formatedDate, myAge } from "@/lib/utils";



const Edit = ({ message, id, data }) => {
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
    const [msg, setMsg] = useState("");


    const showEditForm = () => {
        setShow(true);
        const helper = getItems('helper');
        const unit = helper.data.unit;
        const v = sortVillage(unit);
        setVillages(v);
        message('Data ready to edit');



        // ------------------------------------

        const { name, dob, gender, disability, disabilityNature, fmName, edn, isMarried, employeement, religion, device, mobile, village } = data.find(registration => registration.id === id) || { name: '', dob: '', gender: '', disability: '', disabilityNature: '', fmName: '', edn: '', isMarried: '', employeement: '', religion: '', device: '', mobile: '', village: '' };
        setName(name);
        setDob(formatedDate(dob));
        setGender(gender);
        setDisability(disability);
        setDisabilityNature(disabilityNature);
        setFmName(fmName);
        setEdn(edn);
        setIsMarried(isMarried);
        setEmployeement(employeement);
        setReligion(religion);
        setDevice(device);
        setMobile(mobile);
        setVillage(village);
    };


    const closeEditForm = () => {
        setShow(false);
        message("Data ready");
    };


    const createObject = () => {
        return {
            id: id,
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


        if (mobile.length < 11) {
            setMsg("Mobile number is not correct.");
            return false
        }
        //-------------------------------------------


        try {
            const newObject = createObject();
            const response = updateItem('registration', id, newObject);
            message(response.message);
        } catch (error) {
            console.error("Error saving registration data:", error);
            message("Error saving registration data.");
        } finally {
            setShow(false);
            setMsg("Participan age range must be 13 to 56 years.");
        }
    }





    return (
        <>
            {show && (
                <div className="fixed inset-0 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 lg:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <button onClick={closeEditForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                        </div>

                        <div className="px-6 pb-6 text-black">
                            <p className="mt-2 text-start text-red-500">** {msg}</p>
                            <form onSubmit={saveHandler} >
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
                                    <input type="button" onClick={closeEditForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>


                    </div >
                </div >
            )}
            <button onClick={showEditForm} title="Edit" className="px-1 py-1 hover:bg-teal-300 rounded-md transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-black hover:stroke-blue-800 transition duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default Edit;


