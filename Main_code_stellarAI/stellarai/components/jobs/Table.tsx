import { useEffect, useState } from 'react';
import {
	createStyles,
	Table,
	Modal,
	Group,
	Text,
	Stack,
	Divider,
	Select,
	Pagination,
	Button,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
	rowSelected: {
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
				: theme.colors[theme.primaryColor][0],
	},
}));

interface TableSelectionProps {
	data: {
		title: string;
		company: string;
		salary: string;
		id: string;
		description: string;
	}[];
}

export function TableSelection({ data }: TableSelectionProps) {
	const { classes, cx } = useStyles();
	const [activePage, setPage] = useState(1);
	const pageSize = 10;
	const [opened, setOpened] = useState(false);
	const [currentDescription, setCurrentDescription] = useState('');
	const [currentPageData, setCurrentPageData] = useState(
		data.slice(0, pageSize)
	);
	useEffect(() => {
		setCurrentPageData(
			data.slice(pageSize * (activePage - 1), pageSize * activePage)
		);
	}, [activePage]);
	const rows = currentPageData.map((item) => {
		return (
			<tr key={item.id}>
				<td>
					<Group spacing="sm">
						<Text size="sm" weight={500}>
							{item.title}
						</Text>
					</Group>
				</td>
				<td>{item.company}</td>
				<td>$ {item.salary}</td>
				<td>
					<Button
						size="xs"
						onClick={() => {
							setCurrentDescription(item.description);
							setOpened(true);
						}}
					>
						More Details
					</Button>
				</td>
			</tr>
		);
	});

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Job Details"
			>
				<h3>More details coming soon!</h3>
				<Text>{currentDescription}</Text>
			</Modal>
			<Stack align={'center'}>
				<Group align={'center'} position={'apart'} sx={{ width: '100%' }}>
					{/* <Select
					style={{ zIndex: 2 }}
					data={['Engineer', 'Analyst', 'Recruiter']}
					placeholder="Pick one"
					label="Filter by role"
				/> */}
					<Text weight={700} size="md">
						Filterable content coming soon!
					</Text>
				</Group>
				<Divider my="sm" variant="dashed" sx={{ width: '100%' }} />
				<Table verticalSpacing="sm">
					<thead>
						<tr>
							<th>Title</th>
							<th>Company</th>
							<th>Salary</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
				<Pagination
					page={activePage}
					onChange={setPage}
					total={Math.ceil(data.length / 10)}
					withEdges
					sx={{ marginTop: '1.4%' }}
				/>
			</Stack>
		</>
	);
}
