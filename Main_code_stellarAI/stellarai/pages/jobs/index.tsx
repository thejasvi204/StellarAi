import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { createStyles } from '@mantine/core';
import type { NextPage } from 'next';
import { TableSelection } from '../../components/jobs/Table';
import { uuidv4 } from '@firebase/util';

export async function getStaticProps() {
	const querySnapshot = await getDocs(collection(db, 'jobs'));
	let jobList: any = [];
	querySnapshot.forEach((doc) => {
		jobList.push(doc.data());
	});
	jobList.forEach((job: any) => {
		job.id = uuidv4();
	});
	return {
		props: {
			data: jobList,
		}, // will be passed to the page component as props
	};
}

const Jobs: NextPage = ({ data }: any) => {
	const { classes } = useStyles();

	return <TableSelection data={data} />;
};

const useStyles = createStyles((theme) => ({
	filterGroup: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '60%',
	},
}));

export default Jobs;
