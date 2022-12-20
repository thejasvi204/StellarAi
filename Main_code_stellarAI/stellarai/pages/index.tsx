import {
	createStyles,
	Container,
	Grid,
	Avatar,
	SimpleGrid,
	useMantineTheme,
	Card,
	Stack,
	Text,
	Divider,
	Space,
	Button,
} from '@mantine/core';
import type { NextPage } from 'next';
import { DropzoneButton } from '../components/profile/Dropzone';
import { StatsRing } from '../components/profile/Stats';
import {
	doc,
	getDoc,
	query,
	collection,
	where,
	getDocs,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../components/context/AuthContext';
import { useEffect, useState } from 'react';

const Profile: NextPage = () => {
	const { classes } = useStyles();
	const { currentUser } = useAuth();
	const [profileDetails, setProfileDetails] = useState<any>({});

	useEffect(() => {
		const getUserDetails = async () => {
			try {
				const q = query(
					collection(db, 'users'),
					where('UID', '==', currentUser.uid)
				);
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					setProfileDetails({ name: doc.data().name });
				});
			} catch (e) {
				console.log(e);
			}
		};
		try {
			getUserDetails();
		} catch (e) {
			console.log(e);
		}
	}, [currentUser]);

	return (
		<Container size={'xl'}>
			<Stack>
				<Card shadow="md">
					<Stack align={'center'} spacing={'xs'}>
						<Avatar size={'xl'} radius={'xl'} />
						<Text weight={700} size={'xl'}>
							{profileDetails.name}
						</Text>
						<Text weight={400} size={'md'}>
							Job Title coming soon!
						</Text>
					</Stack>
				</Card>
				<Grid gutter="md">
					<Grid.Col>
						<Card shadow="md">
							<DropzoneButton />
						</Card>
					</Grid.Col>
					<Grid.Col span={12}>
						<Card shadow="md">
							<StatsRing
								data={[
									{
										label: 'Account Manager',
										stats: '100',
										progress: 20,
										color: 'green',
										icon: 'up',
									},
									{
										label: 'Consultant',
										stats: '200',
										progress: 80,
										color: 'red',
										icon: 'up',
									},
									{
										label: 'Data Analyst',
										stats: '40',
										progress: 80,
										color: 'yellow',
										icon: 'up',
									},
									{
										label: 'Data Scientist',
										stats: '40',
										progress: 80,
										color: 'yellow',
										icon: 'up',
									},
									{
										label: 'Marketing',
										stats: '40',
										progress: 80,
										color: 'yellow',
										icon: 'up',
									},
									{
										label: 'Product Manager',
										stats: '40',
										progress: 80,
										color: 'yellow',
										icon: 'up',
									},
									{
										label: 'Project Manager',
										stats: '40',
										progress: 80,
										color: 'yellow',
										icon: 'up',
									},
									{
										label: 'Sales',
										stats: '40',
										progress: 80,
										color: 'yellow',
										icon: 'up',
									},
									{
										label: 'Ux Designer',
										stats: '40',
										progress: 80,
										color: 'yellow',
										icon: 'up',
									},
								]}
							/>
						</Card>
					</Grid.Col>
				</Grid>
			</Stack>
		</Container>
	);
};

const useStyles = createStyles((theme) => ({
	pageWrapper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default Profile;
