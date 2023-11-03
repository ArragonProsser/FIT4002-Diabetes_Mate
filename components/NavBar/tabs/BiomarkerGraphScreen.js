import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import {
    LineChart as ChartKitChart
} from 'react-native-chart-kit';
import { SelectList } from 'react-native-dropdown-select-list';
import IonIcons from 'react-native-vector-icons/Ionicons';
// import { LineChart as GiftedChartsChart } from "react-native-gifted-charts"
import { Auth, API } from "aws-amplify";
import { useIsFocused } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Enum defined to ensure references to biomarkers are consistent
const biomarkerEnum = {
    weight: "Weight",
    bp: "Blood Pressure",
    hba1c: "HbA1c",
    totalCholesterol: "Total Cholesterol",
    TGCholesterol: "Triglycerides",
    HDLCholesterol: "HDL Cholesterol",
    LDLCholesterol: "LDL Cholesterol",
    urine: "Urine Albumin to Creatinine Ratio"
};

const styles = StyleSheet.create({
    dateRangeButton: {
        width: "15%",
        paddingTop: 3,
        paddingBottom: 4,
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "lightgrey"
    },
    dateRangeSelectedButton: {
        width: "15%",
        paddingTop: 3,
        paddingBottom: 4,
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "#467FD6"
    },
});

function formatDate(date) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    return `${day} ${monthNames[monthIndex]} ${year}`;
}

async function getAppointmentsData() {
    const apiName = "Diabetesmate";
    const path = "/appointments/GET";
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    const myInit = {
        headers: {
            Authorization: token
        },
        signerServiceInfo: {
            service: null,
            region: null
        }
    };
    return await API.get(apiName, path, myInit);
}

async function testAuth() {
    const apiName = "Diabetesmate";
    const path = `/appointments/test-auth?${new Date().getTime()}`;
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    const myInit = {
        headers: {
            Authorization: token
        },
        signerServiceInfo: {
            service: null,
            region: null
        }
    };
    return await API.post(apiName, path, myInit);
}

function ChartKitChartConsumer({ biomarkerKey, suffix, data, secondaryData, dates }) {
    console.log("🚀 ~ file: BiomarkerScreen.js:94 ~ ChartKitChartConsumer ~ biomarkerKey:", biomarkerKey);
    console.log("🚀 ~ file: BiomarkerScreen.js:94 ~ ChartKitChartConsumer ~ data:", data);
    console.log("🚀 ~ file: BiomarkerScreen.js:94 ~ ChartKitChartConsumer ~ secondaryData:", secondaryData);

    const dataset = useRef([]);

    dataset.current = [{
        data: data,
        strokeWidth: 4,
        color: (opacity = 1) => `rgba(70, 127, 214, ${Math.min(opacity * 2, 1)})`,
        withScrollableDot: true,
    }];
    console.log("🚀 ~ file: BiomarkerScreen.js:99 ~ ChartKitChartConsumer ~ dataset:", dataset);

    if (secondaryData) {
        console.log(secondaryData);
        dataset.current.push({
            data: secondaryData,
            strokeWidth: 4,
            color: (opacity = 1) => `rgba(170, 127, 214, ${Math.min(opacity * 2, 1)})`,
            withScrollableDot: true,
        });
        // console.log("🚀 ~ file: BiomarkerScreen.js:108 ~ ChartKitChartConsumer ~ dataset:", dataset.current);
    }

    const [x, setX] = useState(-16);
    const containerRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [maxYLabel, setMaxYLabel] = useState(-Infinity);
    const [minYLabel, setMinYLabel] = useState(+Infinity);

    useEffect(() => {
        setMaxYLabel(Math.max(...(secondaryData || []), ...data));
        setMinYLabel(Math.min(...(secondaryData || []), ...data));
    }, [data]);

    return (
        <View style={{ flex: 1, marginTop: 150, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>
            <Text style={{ fontWeight: "bold", fontSize: 30, color: "darkblue" }}>{selectedIndex >= 0 && data[selectedIndex]}{secondaryData && secondaryData[selectedIndex] ? "/" + secondaryData[selectedIndex] : ""}{selectedIndex >= 0 && suffix}</Text>
            <Text style={{ color: "darkblue", marginBottom: 90 }}>{selectedIndex >= 0 && dates[selectedIndex]}</Text>
            <View ref={containerRef} style={{ marginLeft: -65 }}>
                <ChartKitChart
                    data={{
                        // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                        datasets: dataset.current
                    }}
                    withVerticalLines={false}
                    yLabelsOffset={-(Dimensions.get('window').width - 85)}
                    formatXLabel={() => ''}
                    formatYLabel={(yStr) => {
                        console.log("🚀 ~ file: BiomarkerScreen.js:149 ~ ChartKitChartConsumer ~ yStr:", yStr);
                        const y = Number(yStr);
                        if ([maxYLabel, minYLabel].indexOf(y) >= 0) {
                            return yStr + suffix;
                        }
                        return '';
                    }}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    transparent={true}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 1,
                        color: (opacity = 1, index) => {
                            return index === 2 ? `rgba(0, 0, 0, 0)` : `rgba(0, 0, 0, ${opacity})`;
                        },
                        fillShadowGradientFrom: 'rgba(100, 150, 256, 1)',
                        fillShadowGradientTo: '#FFFFFF',
                        style: {
                            borderRadius: 16,
                        },
                        propsForBackgroundLines: { strokeWidth: 1, strokeDasharray: "" }
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                    onDataPointClick={(x) => {
                        setSelectedIndex(x.index);
                        setX(x.x);
                    }}
                />
                <View style={{
                    borderStyle: "dashed",
                    borderColor: "rgba(70, 127, 214, 0.5)",
                    borderWidth: 1,
                    position: "absolute",
                    width: 1,
                    height: 190,
                    left: x,
                }}></View>
            </View>
        </View>
    );
}

function SelectBiomarkerChart({ data, setSelected }) {
    /*
        This function returns the Dropdown Selector component.

        data: an array of objects, where each object has a value and a key. The value is what is rendered and the key is a unique identifier for each value
        setSelected: a method called when a new value is selected from the dropdown.
    */
    return (
        <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            defaultOption={data[0]}
            search={false}
            dropdownStyles={{ backgroundColor: 'white' }}
            arrowicon={<IonIcons name='chevron-down' size={20} color='darkblue' />}
        />
    );
}

export default function BiomarkerScreen({ navigation }) {
    const [dataset, setDataset] = useState(null);       // Dataset that is currently being graphed
    const [secondaryDataset, setSecondaryDataset] = useState(null);       // Dataset that is currently being graphed

    const isFocused = useIsFocused();

    // useState variables for storing the datasets of each of the biomarkers
    const [weightDataset, setWeightDataset] = useState({ suffix: " kg", data: [] });
    const [diastolicBpDataset, setDiastolicBpDataset] = useState({ suffix: " mmHg", data: [] });
    const [systolicBpDataset, setSystolicBpDataset] = useState({ suffix: " mmHg", data: [] });
    const [hba1cDataset, setHba1cDataset] = useState({ suffix: " %", data: [] });
    const [totCholesterolDataset, setTotCholesterolDataset] = useState({ suffix: " mmol/L", data: [] });
    const [hdlDataset, setHdlDataset] = useState({ suffix: " mmol/L", data: [] });
    const [ldlDataset, setLdlDataset] = useState({ suffix: " mmol/L", data: [] });
    const [tgDataset, setTgDataset] = useState({ suffix: " mmol/L", data: [] });
    const [urineDataset, setUrineDataset] = useState({ suffix: " mg/mmol", data: [] });

    // Variables for Dropdown selector
    const [selectedBiomarker, setSelectedBiomarker] = useState(null);       // Currently selected dropdown value
    const biomarkersDropdown = [        // Options for Dropdown selector
        { value: biomarkerEnum.weight, key: biomarkerEnum.weight },
        { value: biomarkerEnum.bp, key: biomarkerEnum.bp },
        { value: biomarkerEnum.hba1c, key: biomarkerEnum.hba1c },
        { value: biomarkerEnum.totalCholesterol, key: biomarkerEnum.totalCholesterol },
        { value: biomarkerEnum.HDLCholesterol, key: biomarkerEnum.HDLCholesterol },
        { value: biomarkerEnum.LDLCholesterol, key: biomarkerEnum.LDLCholesterol },
        { value: biomarkerEnum.TGCholesterol, key: biomarkerEnum.TGCholesterol },
        { value: biomarkerEnum.urine, key: biomarkerEnum.urine }
    ];

    const [dateRange, setDateRange] = useState(1);
    const dateRangeOptions = {
        oneMonth: new Date(),
        threeMonths: new Date(),
        sixMonths: new Date(),
        twelveMonths: new Date(),
        allTime: new Date()
    };

    useEffect(() => {
        isFocused && testAuth().then(console.log).catch((e) => { console.log("BiomarkerScreen - testAuth - ", e); });
        isFocused && getAppointmentsData().then((response) => {
            console.log("BiomarkerScreen.js START___");
            console.log(response.Items);
            console.log("BiomarkerScreen.js END___");
            let appointments = response.Items;
            appointments.sort(
                (d1, d2) =>
                    new Date(d2.appointment_datetime) - new Date(d1.appointment_datetime)
            );

            let tempdata = {
                weight: [],
                systolicBP: [],
                diastolicBP: [],
                hba1c: [],
                urine: [],
                totalCholesterol: [],
                ldl: [],
                hdl: [],
                tg: []
            };

            for (let i = 0; i < appointments.length; i++) {
                let currentAppointment = appointments[i];
                const datetime = new Date(currentAppointment["appointment_datetime"]);
                if (currentAppointment["biomarker"]["data"]["weight"] !== "") {
                    tempdata.weight.push({ datetime_recorded: datetime, data: currentAppointment["biomarker"]["data"]["weight"] });
                }
                if (currentAppointment["biomarker"]["data"]["systolicBP"] !== "") {
                    tempdata.systolicBP.push({ datetime_recorded: datetime, data: currentAppointment["biomarker"]["data"]["systolicBP"] });
                }
                if (currentAppointment["biomarker"]["data"]["diastolicBP"] !== "") {
                    tempdata.diastolicBP.push({ datetime_recorded: datetime, data: currentAppointment["biomarker"]["data"]["diastolicBP"] });
                }
                if (currentAppointment["biomarker"]["data"]["HbA1c"] !== "") {
                    tempdata.hba1c.push({ datetime_recorded: datetime, data: currentAppointment["biomarker"]["data"]["HbA1c"] });
                }
                if (currentAppointment["biomarker"]["data"]["totalCholesterol"] !== "") {
                    tempdata.totalCholesterol.push({ datetime_recorded: datetime, data: currentAppointment["biomarker"]["data"]["totalCholesterol"] });
                }
                if (currentAppointment["biomarker"]["data"]["HDL"] !== "") {
                    tempdata.hdl.push({ datetime_recorded: datetime, data: currentAppointment["biomarker"]["data"]["HDL"] });
                }
                if (currentAppointment["biomarker"]["data"]["LDL"] !== "") {
                    tempdata.ldl.push({ datetime_recorded: datetime, data: currentAppointment["biomarker"]["data"]["LDL"] });
                }
                if (currentAppointment["biomarker"]["data"]["TG"] !== "") {
                    tempdata.tg.push({ datetime_recorded: datetime, data: currentAppointment["biomarker"]["data"]["TG"] });
                }
                if (currentAppointment["biomarker"]["data"]["urineAlbuminToCreatinineRatio"] !== "") {
                    tempdata.urine.push({ datetime_recorded: datetime, data: currentAppointment["biomarker"]["data"]["urineAlbuminToCreatinineRatio"] });
                }
            }
            setWeightDataset((prev) => ({ ...prev, data: tempdata.weight }));
            setSystolicBpDataset((prev) => ({ ...prev, data: tempdata.systolicBP }));
            setDiastolicBpDataset((prev) => ({ ...prev, data: tempdata.diastolicBP }));
            setHba1cDataset((prev) => ({ ...prev, data: tempdata.hba1c }));
            setTotCholesterolDataset((prev) => ({ ...prev, data: tempdata.totalCholesterol }));
            setHdlDataset((prev) => ({ ...prev, data: tempdata.hdl }));
            setLdlDataset((prev) => ({ ...prev, data: tempdata.ldl }));
            setTgDataset((prev) => ({ ...prev, data: tempdata.tg }));
            setUrineDataset((prev) => ({ ...prev, data: tempdata.urine }));
            setSelectedBiomarker(biomarkerEnum.weight);
        })
            .catch((e) => { console.log("BiomarkerScreen - getAppointmentData", e); });
    }, [isFocused]);

    useEffect(() => {
        /*
        useEffect runs each time the selectedBiomarker variable is updated. This function will check which biomarker is selected and then update the graph to display the data for that biomarker.
        */

        setSecondaryDataset({ suffix: "", data: [] });

        switch (selectedBiomarker) {
            case biomarkerEnum.weight:
                setDataset(weightDataset);
                setSecondaryDataset(null);
                break;
            case biomarkerEnum.bp:
                setDataset(systolicBpDataset);
                setSecondaryDataset(diastolicBpDataset);
                break;
            case biomarkerEnum.hba1c:
                setDataset(hba1cDataset);
                setSecondaryDataset(null);
                break;
            case biomarkerEnum.totalCholesterol:
                setDataset(totCholesterolDataset);
                setSecondaryDataset(null);
                break;
            case biomarkerEnum.HDLCholesterol:
                setDataset(hdlDataset);
                setSecondaryDataset(null);
                break;
            case biomarkerEnum.LDLCholesterol:
                setDataset(ldlDataset);
                setSecondaryDataset(null);
                break;
            case biomarkerEnum.TGCholesterol:
                setDataset(tgDataset);
                setSecondaryDataset(null);
                break;
            case biomarkerEnum.urine:
                setDataset(urineDataset);
                setSecondaryDataset(null);
                break;
        }
        console.log("🚀 ~ file: BiomarkerScreen.js:354 ~ useEffect ~ dataset:", dataset);
        console.log("🚀 ~ file: BiomarkerScreen.js:354 ~ useEffect ~ secondaryDataset:", secondaryDataset);

    }, [selectedBiomarker]);

    return (
        <View style={{ height: "100%", backgroundColor: 'white' }} >
            {/* The Dropdown selector component. It has been styled to that it is the top-most element. */}
            <View style={{ marginTop: 35, width: "80%", left: "10%", position: 'absolute', zIndex: 1 }}>
                <SelectBiomarkerChart data={biomarkersDropdown} setSelected={setSelectedBiomarker} />
            </View>

            {/* The Graph component */}
            <View style={{ height: "80%", zIndex: 0 }}>
                { // Checks that there is a dataset to render. If there is no dataset to render displays text explaining, otherwise if there is data it will render the graph.
                    (dataset == null || dataset.data.length == 0) ?
                        <Text> Couldn't render graph </Text>
                        :
                        <ChartKitChartConsumer
                            biomarkerKey={selectedBiomarker}
                            suffix={dataset.suffix}
                            data={dataset.data.map((item) => { return Number(item.data); })}
                            secondaryData={secondaryDataset ? secondaryDataset.data.map((item) => Number(item.data)) : null}
                            dates={dataset.data.map((item) => formatDate(new Date(item.datetime_recorded)))} />
                }
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-around", marginLeft: "5%", marginRight: "5%" }}>
                <TouchableOpacity style={dateRange == 0 ? styles.dateRangeSelectedButton : styles.dateRangeButton} onPress={() => setDateRange(0)}>
                    <Text style={dateRange == 0 ? { color: "white" } : {}}>1M</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dateRange == 1 ? styles.dateRangeSelectedButton : styles.dateRangeButton} onPress={() => setDateRange(1)}>
                    <Text style={dateRange == 1 ? { color: "white" } : {}}>3M</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dateRange == 2 ? styles.dateRangeSelectedButton : styles.dateRangeButton} onPress={() => setDateRange(2)}>
                    <Text style={dateRange == 2 ? { color: "white" } : {}}>6M</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dateRange == 3 ? styles.dateRangeSelectedButton : styles.dateRangeButton} onPress={() => setDateRange(3)}>
                    <Text style={dateRange == 3 ? { color: "white" } : {}}>12M</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dateRange == 4 ? styles.dateRangeSelectedButton : styles.dateRangeButton} onPress={() => setDateRange(4)}>
                    <Text style={dateRange == 4 ? { color: "white" } : {}}>ALL</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}