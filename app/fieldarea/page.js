const Fieldarea = () => {

    const data = [

        {
            name: "Gobratola",
            thana: "Gomostapur",
            district: "Chapainwabganj"
        },
        {
            name: "Alinagar",
            thana: "Gomostapur",
            district: "Chapainwabganj"
        },
        {
            name: "Elaipur",
            thana: "Nachol",
            district: "Chapainwabganj"
        },
        {
            name: "Noyadiari",
            thana: "Gomostapur",
            district: "Chapainwabganj"
        },
        {
            name: "Ulipur",
            thana: "Ulipur",
            district: "Kurigram"
        },
        {
            name: "Fulbari",
            thana: "Fulbari",
            district: "Kurigram"
        },
        {
            name: "Damkura",
            thana: "Paba",
            district: "Rajshahi"
        },
        {
            name: "Vatpara",
            thana: "Putia",
            district: "Rajshahi"
        },

        {
            name: "Khaserhat",
            thana: "Patuakhali",
            district: "Patuakhali"
        },

        {
            name: "Patharghata",
            thana: "Patharghata",
            district: "Barguna"
        },
        {
            name: "Amtoli",
            thana: "Amtoli",
            district: "Barguna"
        },
        {
            name: "Amua",
            thana: "Morichbuna",
            district: "Jhalokathi"
        },

        {
            name: "Satbaria",
            thana: "Chandanish",
            district: "Chottogram"
        },
        {
            name: "Ranirbandar",
            thana: "Chirirbandar",
            district: "Dinajpur"
        },
        {
            name: "Ghontaghor",
            thana: "Chirirbandar",
            district: "Dinajpur"
        },
        {
            name: "Deuty",
            thana: "Pirgacha",
            district: "Rangpur"
        },
        {
            name: "Kayetpara",
            thana: "Sreepur",
            district: "Gazipur"
        },
        {
            name: "Rajabari",
            thana: "Rajendrapur",
            district: "Gazipur"
        },
        {
            name: "Haluaghat",
            thana: "Haluaghat",
            district: "Mymensing"
        },
        {
            name: "Nalitabari",
            thana: "Nalitabari",
            district: "Serpur"
        },
        {
            name: "Bakshiganj",
            thana: "Bakshiganj",
            district: "Jamalpur"
        },
        {
            name: "Jaldhaka",
            thana: "Jaldhaka",
            district: "Nilphamari"
        },
        {
            name: "Malgara",
            thana: "Kaliganj",
            district: "Lalmonirhat"
        },
        {
            name: "Jointiapur",
            thana: "Jointiapur",
            district: "Sylhet"
        },
        {
            name: "Kuripara",
            thana: "Kuripara",
            district: "Sirajganj"
        }
    ]

    return (
        <div className="w-full px-4 py-20 bg-blue-300">

            <h1 className="w-full py-10 text-center text-3xl lg:text-6xl font-bold uppercase">Our Field Area</h1>
            <div className="w-full flex flex-col lg:flex-row space-y-4 lg:space-x-4">
                <div className="w-full grid gird-cols-1 lg:grid-cols-2 gap-4 pt-4">
                    {data.map((d, i) => {
                        return (
                            <div className="w-full" key={i}>
                                <div className="w-full p-4 bg-blue-50">
                                    <h1 className="w-full text-center font-bold">{i + 1}. {d.name}</h1>
                                    <p className="w-full text-center">{d.thana}, {d.district}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>


                <div className="w-full flex flex-col justify-start space-y-4">
                    <img className="w-full h-auto hidden lg:block" src="/images/fieldarea/bg1.png" alt="basic education" />
                    <img className="w-full h-auto" src="/images/fieldarea/bg2.jpg" alt="basic education" />
                </div>


            </div>
        </div>
    )
}

export default Fieldarea;