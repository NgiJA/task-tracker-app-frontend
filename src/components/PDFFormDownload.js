import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Font
} from "@react-pdf/renderer";
import KanitRegular from "../font/Kanit/Kanit-Regular.ttf";
import moment from "moment";

Font.register({
	family: "KanitRegular",
	src: KanitRegular
});

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

function PDFFormDownload({ todolist, user }) {
	const countPage = Math.ceil(todolist.length / 25);
	// slice data to show 25 item per page
	const displayData = [];
	let startIndex = 0;
	let endIndex = 25;

	for (let i = 0; i < countPage; i++) {
		let sliceData = todolist.slice(startIndex, endIndex);
		displayData.push(sliceData);
		startIndex += 25;
		endIndex += 25;
	}

	return (
		<Document>
			{displayData.map((dataPerPage, index) => (
				<Page size="A4" style={styles.page} key={index}>
					<View style={styles.section}>
						<Text style={styles.header}>Monthly To-Do List Report</Text>

						<View style={styles.textBoxContainer}>
							<Text style={styles.label}>User Name :</Text>
							<Text style={styles.textBox}>
								{user.firstName} {user.lastName}
							</Text>
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
									<Text style={styles.tableCell}>
										{moment(item.date).format("DD-MM-YYYY")}
									</Text>
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
}

export default PDFFormDownload;
