import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import {
    LineChart as ChartKitChart
} from 'react-native-chart-kit';
import { SelectList } from 'react-native-dropdown-select-list';
import IonIcons from 'react-native-vector-icons/Ionicons';
// import { LineChart as GiftedChartsChart } from "react-native-gifted-charts"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Enum defined to ensure references to biomarkers are consistent
const biomarkerEnum = {
    weight: "Weight",
    bp: "Blood Pressure",
    hba1c: "HbA1c",
    lipid: "Lipid Profile",
    urine: "Urine"
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

function ChartKitChartConsumer({ suffix, dataset, dates }) {
    const [x, setX] = useState(-16);
    const containerRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [maxYLabel, setMaxYLabel] = useState(-Infinity);
    const [minYLabel, setMinYLabel] = useState(+Infinity);
    useEffect(() => {
        setMinYLabel(Math.min(...dataset));
        setMaxYLabel(Math.max(...dataset));
    }, [dataset]);
    return (
        <View style={{ flex: 1, marginTop: 150, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>
            <Text style={{ fontWeight: "bold", fontSize: 30, color: "darkblue" }}>{selectedIndex >= 0 && dataset[selectedIndex].toFixed(1) + suffix}</Text>
            <Text style={{ color: "darkblue", marginBottom: 90 }}>{selectedIndex >= 0 && dates[selectedIndex]}</Text>
            <View ref={containerRef} style={{ marginLeft: -65 }}>
                <ChartKitChart
                    data={{
                        // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                        datasets: [
                            {
                                data: dataset,
                                strokeWidth: 4,
                                color: (opacity = 1) => `rgba(70, 127, 214, ${Math.min(opacity * 2, 1)})`,
                                withScrollableDot: true,
                            },
                        ],
                    }}
                    withVerticalLines={false}
                    yLabelsOffset={-(Dimensions.get('window').width - 85)}
                    formatXLabel={() => ''}
                    formatYLabel={(yStr) => {
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

// function GiftedChartsChartConsumer(){
//     return <GiftedChartsChart data={[{value: 0}]}/>
// }

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

    // useState variables for storing the datasets of each of the biomarkers
    // TODO: Currently storing dummy data, once fetch requests have been implemented below should be initialised as null.
    const [weightDataset, setWeightDataset] = useState({
        suffix: " kg",
        data: [
            { datetime_recorded: new Date().setFullYear(2023, 5, 10), data: 75 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 11), data: 79 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 12), data: 77 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 13), data: 74 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 14), data: 70 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 17), data: 73 }]
    });
    const [bpDataset, setBpDataset] = useState({
        suffix: " mmHg",
        data: [
            { datetime_recorded: new Date().setFullYear(2023, 5, 10), data: 123 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 11), data: 120 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 12), data: 122 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 13), data: 124 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 14), data: 125 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 17), data: 121 }]
    });
    const [hba1cDataset, setHba1cDataset] = useState({
        suffix: " %",
        data: [
            { datetime_recorded: new Date().setFullYear(2023, 5, 10), data: 15 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 11), data: 13 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 12), data: 12 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 13), data: 13 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 14), data: 11 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 17), data: 8 }]
    });
    const [lipidDataset, setLipidDataset] = useState({
        suffix: " mmol/L",
        data: [
            { datetime_recorded: new Date().setFullYear(2023, 5, 10), data: 12 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 11), data: 11 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 12), data: 12 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 13), data: 13 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 14), data: 11 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 17), data: 8 }]
    });
    const [urineDataset, setUrineDataset] = useState({
        suffix: " mg/mmol",
        data: [
            { datetime_recorded: new Date().setFullYear(2023, 5, 10), data: 156 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 11), data: 154 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 12), data: 145 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 13), data: 140 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 14), data: 142 },
            { datetime_recorded: new Date().setFullYear(2023, 5, 17), data: 140 }]
    });

    // Variables for Dropdown selector
    const [selectedBiomarker, setSelectedBiomarker] = useState(null);       // Currently selected dropdown value
    const biomarkersDropdown = [        // Options for Dropdown selector
        { value: biomarkerEnum.weight, key: biomarkerEnum.weight },
        { value: biomarkerEnum.bp, key: biomarkerEnum.bp },
        { value: biomarkerEnum.hba1c, key: biomarkerEnum.hba1c },
        { value: biomarkerEnum.lipid, key: biomarkerEnum.lipid },
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
        /*
        useEffect runs once after the first render since dependency array is empty. This useEffect fetches the data for each of the biomarkers and stores them in the respective variables. It then sets the default selected value to be the weight biomarker.
        */
        // TODO: implement fetch requests to get data from database
        // fetch()// weight
        //    .then(response => response.json())
        //    .then(() => {
        //        setWeightDataset(response);
        //    });

        // fetch()// bp
        //    .then(response => response.json())
        //    .then(() => {
        //        updateBpDataset(response);
        //    });

        // fetch()// hba1c
        //    .then(response => response.json())
        //    .then(() => {
        //        setHba1cDataset(response);
        //    });

        // fetch()// lipid
        //    .then(response => response.json())
        //    .then(() => {
        //        setLipidDataset(response);
        //    });

        // fetch()// urine
        //    .then(response => response.json())
        //    .then(() => {
        //        setUrineDataset(response);
        //    });

        if (weightDataset != null) {
            setSelectedBiomarker(biomarkerEnum.weight);
        }
    }, []);

    useEffect(() => {
        /*
        useEffect runs each time the selectedBiomarker variable is updated. This function will check which biomarker is selected and then update the graph to display the data for that biomarker.
        */
        switch (selectedBiomarker) {
            case biomarkerEnum.weight:
                setDataset(weightDataset);
                break;
            case biomarkerEnum.bp:
                setDataset(bpDataset);
                break;
            case biomarkerEnum.hba1c:
                setDataset(hba1cDataset);
                break;
            case biomarkerEnum.lipid:
                setDataset(lipidDataset);
                break;
            case biomarkerEnum.urine:
                setDataset(urineDataset);
                break;
        }
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
                    (dataset == null) ?
                        <Text> Couldn't render graph </Text>
                        :
                        <ChartKitChartConsumer suffix={dataset.suffix} dataset={dataset.data.map((item) => { return item.data; })} dates={dataset.data.map((item) => formatDate(new Date(item.datetime_recorded)))} />
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