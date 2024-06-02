import {
	PDFViewer,
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Font
} from "@react-pdf/renderer";
import KanitRegular from "../font/Kanit/Kanit-Regular.ttf";

Font.register({
	family: "KanitRegular",
	src: KanitRegular
});

const data = [
	{
		id: 5,
		date: "5/15/2024, 12:00:00 AM",
		task: "กินข้าว2",
		status: "To Do",
		createdAt: "5/13/2024, 4:29:05 PM",
		updatedAt: "5/26/2024, 2:38:35 PM",
		userId: 11
	},
	{
		id: 9,
		date: "5/18/2024, 12:00:00 AM",
		task: "อ่านหนังสือ3",
		status: "Done",
		createdAt: "5/14/2024, 2:05:27 PM",
		updatedAt: "5/26/2024, 2:38:49 PM",
		userId: 11
	},
	{
		id: 10,
		date: "5/17/2024, 12:00:00 AM",
		task: "ดูพาวเวอร์พัฟเกิร์ล",
		status: "To Do",
		createdAt: "5/14/2024, 2:05:38 PM",
		updatedAt: "5/14/2024, 2:05:38 PM",
		userId: 11
	},
	{
		id: 17,
		date: "5/20/2024, 12:00:00 AM",
		task: "ถูพื้น",
		status: "Done",
		createdAt: "5/14/2024, 2:06:29 PM",
		updatedAt: "5/26/2024, 2:39:18 PM",
		userId: 11
	},
	{
		id: 18,
		date: "5/20/2024, 12:00:00 AM",
		task: "เติมเกม",
		status: "Done",
		createdAt: "5/14/2024, 2:06:38 PM",
		updatedAt: "5/26/2024, 2:39:19 PM",
		userId: 11
	},
	{
		id: 19,
		date: "5/21/2024, 12:00:00 AM",
		task: "ตีเทนนิส",
		status: "Done",
		createdAt: "5/14/2024, 2:06:45 PM",
		updatedAt: "5/26/2024, 2:39:19 PM",
		userId: 11
	},
	{
		id: 20,
		date: "5/21/2024, 12:00:00 AM",
		task: "เดินห้าง",
		status: "To Do",
		createdAt: "5/14/2024, 2:06:50 PM",
		updatedAt: "5/14/2024, 2:06:50 PM",
		userId: 11
	},
	{
		id: 22,
		date: "5/21/2024, 12:00:00 AM",
		task: "โหลดเกม",
		status: "Done",
		createdAt: "5/14/2024, 2:07:23 PM",
		updatedAt: "5/26/2024, 2:39:40 PM",
		userId: 11
	},
	{
		id: 52,
		date: "5/25/2024, 5:00:00 PM",
		task: "test",
		status: "Done",
		createdAt: "5/26/2024, 3:56:03 AM",
		updatedAt: "5/26/2024, 2:39:31 PM",
		userId: 11
	},
	{
		id: 55,
		date: "5/25/2024, 5:00:00 PM",
		task: "test",
		status: "To Do",
		createdAt: "5/26/2024, 3:56:22 AM",
		updatedAt: "5/26/2024, 3:56:22 AM",
		userId: 11
	},
	{
		id: 56,
		date: "5/25/2024, 5:00:00 PM",
		task: "test",
		status: "To Do",
		createdAt: "5/26/2024, 3:56:23 AM",
		updatedAt: "5/26/2024, 3:56:23 AM",
		userId: 11
	},
	{
		id: 57,
		date: "5/25/2024, 5:00:00 PM",
		task: "test",
		status: "To Do",
		createdAt: "5/26/2024, 3:56:24 AM",
		updatedAt: "5/26/2024, 3:56:24 AM",
		userId: 11
	},
	{
		id: 58,
		date: "5/25/2024, 5:00:00 PM",
		task: "test",
		status: "Done",
		createdAt: "5/26/2024, 3:56:28 AM",
		updatedAt: "5/26/2024, 2:42:33 PM",
		userId: 11
	},
	{
		id: 59,
		date: "5/25/2024, 5:00:00 PM",
		task: "test",
		status: "To Do",
		createdAt: "5/26/2024, 3:56:29 AM",
		updatedAt: "5/26/2024, 3:56:29 AM",
		userId: 11
	},
	{
		id: 61,
		date: "5/25/2024, 5:00:00 PM",
		task: "test",
		status: "Done",
		createdAt: "5/26/2024, 4:08:39 AM",
		updatedAt: "5/26/2024, 2:42:34 PM",
		userId: 11
	},
	{
		id: 64,
		date: "5/25/2024, 5:00:00 PM",
		task: "test1",
		status: "To Do",
		createdAt: "5/26/2024, 4:21:25 AM",
		updatedAt: "5/26/2024, 4:21:25 AM",
		userId: 11
	},
	{
		id: 65,
		date: "5/25/2024, 5:00:00 PM",
		task: "test2",
		status: "To Do",
		createdAt: "5/26/2024, 4:21:25 AM",
		updatedAt: "5/26/2024, 4:21:25 AM",
		userId: 11
	},
	{
		id: 66,
		date: "5/26/2024, 5:00:00 PM",
		task: "test3",
		status: "Done",
		createdAt: "5/26/2024, 4:21:42 AM",
		updatedAt: "5/26/2024, 2:42:34 PM",
		userId: 11
	},
	{
		id: 67,
		date: "5/26/2024, 5:00:00 PM",
		task: "สวัสดีครับ",
		status: "To Do",
		createdAt: "5/26/2024, 2:40:24 PM",
		updatedAt: "5/26/2024, 2:40:24 PM",
		userId: 11
	},
	{
		id: 68,
		date: "5/26/2024, 5:00:00 PM",
		task: "ผมชื่อ",
		status: "Done",
		createdAt: "5/26/2024, 2:40:24 PM",
		updatedAt: "5/26/2024, 2:42:35 PM",
		userId: 11
	},
	{
		id: 69,
		date: "5/26/2024, 5:00:00 PM",
		task: "เวฟ",
		status: "To Do",
		createdAt: "5/26/2024, 2:40:24 PM",
		updatedAt: "5/26/2024, 2:40:24 PM",
		userId: 11
	},
	{
		id: 70,
		date: "5/13/2024, 5:00:00 PM",
		task: "ทำกับข้าว",
		status: "To Do",
		createdAt: "5/26/2024, 4:55:08 PM",
		updatedAt: "5/26/2024, 4:55:08 PM",
		userId: 11
	},
	{
		id: 71,
		date: "5/12/2024, 5:00:00 PM",
		task: "ทำกับข้าว2",
		status: "To Do",
		createdAt: "5/26/2024, 4:56:39 PM",
		updatedAt: "5/26/2024, 4:56:39 PM",
		userId: 11
	},
	{
		id: 72,
		date: "5/29/2024, 5:00:00 PM",
		task: "ทำกับข้าว3",
		status: "To Do",
		createdAt: "5/26/2024, 4:57:29 PM",
		updatedAt: "5/26/2024, 4:57:29 PM",
		userId: 11
	},
	{
		id: 73,
		date: "5/29/2024, 5:00:00 PM",
		task: "ทำกับข้าว4",
		status: "To Do",
		createdAt: "5/26/2024, 4:59:01 PM",
		updatedAt: "5/26/2024, 4:59:01 PM",
		userId: 11
	},
	{
		id: 74,
		date: "5/29/2024, 5:00:00 PM",
		task: "ทำกับข้าว5",
		status: "To Do",
		createdAt: "5/26/2024, 4:59:01 PM",
		updatedAt: "5/26/2024, 4:59:01 PM",
		userId: 11
	},
	{
		id: 75,
		date: "5/30/2024, 12:00:00 AM",
		task: "ทำกับข้าว6",
		status: "To Do",
		createdAt: "5/27/2024, 12:11:39 AM",
		updatedAt: "5/27/2024, 12:11:39 AM",
		userId: 11
	},
	{
		id: 76,
		date: "5/30/2024, 12:00:00 AM",
		task: "ทำกับข้าว7",
		status: "To Do",
		createdAt: "5/27/2024, 12:11:39 AM",
		updatedAt: "5/27/2024, 12:11:39 AM",
		userId: 11
	},
	{
		id: 77,
		date: "5/30/2024, 12:00:00 AM",
		task: "ทำกับข้าว8",
		status: "To Do",
		createdAt: "5/27/2024, 12:12:15 AM",
		updatedAt: "5/27/2024, 12:12:15 AM",
		userId: 11
	},
	{
		id: 78,
		date: "5/30/2024, 12:00:00 AM",
		task: "ทำกับข้าว9",
		status: "To Do",
		createdAt: "5/27/2024, 12:15:06 AM",
		updatedAt: "5/27/2024, 12:15:06 AM",
		userId: 11
	},
	{
		id: 79,
		date: "5/30/2024, 12:00:00 AM",
		task: "สวัสดีครับ",
		status: "To Do",
		createdAt: "5/27/2024, 12:48:09 AM",
		updatedAt: "5/27/2024, 12:48:09 AM",
		userId: 11
	},
	{
		id: 80,
		date: "5/27/2024, 12:00:00 AM",
		task: "Hello",
		status: "To Do",
		createdAt: "5/27/2024, 12:48:09 AM",
		updatedAt: "5/27/2024, 12:48:09 AM",
		userId: 11
	}
];

const countPage = Math.ceil(data.length / 25);

// slice data to show 25 item per page
const displayData = [];
let startIndex = 0;
let endIndex = 25;

for (let i = 0; i < countPage; i++) {
	let sliceData = data.slice(startIndex, endIndex);
	displayData.push(sliceData);
	startIndex += 25;
	endIndex += 25;
}

const styles = StyleSheet.create({
	page: {
		padding: 30
	},
	section: {
		marginBottom: 10
	},
	header: {
		fontSize: 14,
		textAlign: "right",
		marginBottom: 10,
		fontFamily: "KanitRegular"
	},
	textBoxContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		gap: "10",
		marginBottom: 5
	},
	label: {
		width: "20%",
		fontSize: 12,
		textAlign: "right",
		fontFamily: "KanitRegular"
	},
	textBox: {
		width: "40%",
		border: "1 solid #000",
		padding: 2,
		paddingLeft: 10,
		fontSize: 10,
		fontFamily: "KanitRegular"
	},
	table: {
		display: "table",
		width: "auto",
		margin: "0 auto",
		borderStyle: "solid",
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0
	},
	tableRow: {
		flexDirection: "row"
	},
	tableColHeaderDate: {
		width: "15%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		backgroundColor: "#d3d3d3",
		padding: 5,
		textAlign: "center"
	},
	tableColHeaderTask: {
		width: "70%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		backgroundColor: "#d3d3d3",
		padding: 5,
		textAlign: "center"
	},
	tableColHeaderStatus: {
		width: "15%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		backgroundColor: "#d3d3d3",
		padding: 5,
		textAlign: "center"
	},
	tableColDate: {
		width: "15%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		padding: 4,
		textAlign: "center"
	},
	tableColTask: {
		width: "70%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		padding: 4
	},
	tableColStatus: {
		width: "15%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		padding: 4,
		textAlign: "center"
	},
	tableCellHeader: {
		fontSize: 12,
		fontWeight: "bold",
		fontFamily: "KanitRegular"
	},
	tableCell: {
		fontSize: 10,
		fontFamily: "KanitRegular"
	},
	pageSection: {
		fontSize: 10,
		textAlign: "right",
		marginTop: 10
	}
});

const MyDocument = ({ displayData }) => (
	<Document>
		{displayData.map((dataPerPage, index) => (
			<Page size="A4" style={styles.page} key={index}>
				<View style={styles.section}>
					<Text style={styles.header}>Monthly To-Do List Report</Text>

					<View style={styles.textBoxContainer}>
						<Text style={styles.label}>User Name :</Text>
						<Text style={styles.textBox}>CHAIYAPAT RUANGTRAKUL</Text>
					</View>

					<View style={styles.textBoxContainer}>
						<Text style={styles.label}>Report Period :</Text>
						<Text style={styles.textBox}>1 - 31 March 2024</Text>
					</View>
				</View>

				<View style={styles.table}>
					<View style={styles.tableRow}>
						<View style={styles.tableColHeaderDate}>
							<Text style={styles.tableCellHeader}>วันที่</Text>
						</View>
						<View style={styles.tableColHeaderTask}>
							<Text style={styles.tableCellHeader}>ชื่องาน</Text>
						</View>
						<View style={styles.tableColHeaderStatus}>
							<Text style={styles.tableCellHeader}>สถานะ</Text>
						</View>
					</View>
					{dataPerPage.map((item) => (
						<View style={styles.tableRow} key={item.id}>
							<View style={styles.tableColDate}>
								<Text style={styles.tableCell}>{item.date.split(",")[0]}</Text>
							</View>
							<View style={styles.tableColTask}>
								<Text style={styles.tableCell}>{item.task}</Text>
							</View>
							<View style={styles.tableColStatus}>
								<Text style={styles.tableCell}>{item.status}</Text>
							</View>
						</View>
					))}
				</View>
				<View>
					<Text style={styles.pageSection}>
						page {index + 1} of {countPage}
					</Text>
				</View>
			</Page>
		))}
	</Document>
);

function PDFFormView() {
	return (
		<PDFViewer width="100%" height="800">
			<MyDocument displayData={displayData} />
		</PDFViewer>
	);
}

export default PDFFormView;
