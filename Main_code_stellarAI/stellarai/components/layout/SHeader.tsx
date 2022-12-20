import { useEffect, useState } from 'react';
import {
	createStyles,
	Header,
	Container,
	Group,
	Button,
	Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const useStyles = createStyles((theme) => ({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
		width: '90%',
	},

	links: {
		[theme.fn.smallerThan('xs')]: {
			display: 'none',
		},
	},

	burger: {
		[theme.fn.largerThan('xs')]: {
			display: 'none',
		},
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: '8px 12px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		cursor: 'pointer',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
				.color,
		},
	},
}));

interface HeaderSimpleProps {
	links: { link: string; label: string }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
	const [opened, { toggle }] = useDisclosure(false);
	const [active, setActive] = useState(links[0].link);
	const { classes, cx } = useStyles();
	const { currentUser, signOutUser } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!currentUser) {
			router.push('/enter');
		}
	}, [currentUser]);

	const items = links.map((link) => (
		<a
			key={link.label}
			className={cx(classes.link, {
				[classes.linkActive]: active === link.link,
			})}
			onClick={(event) => {
				event.preventDefault();
				setActive(link.link);
				router.push(link.link);
			}}
		>
			{link.label}
		</a>
	));

	return (
		<Header height={60}>
			<Container className={classes.header}>
				<Text weight={500} size={'md'}>
					StellarJobs
				</Text>
				<Group spacing={10} className={classes.links}>
					{items}
				</Group>

				<Button
					onClick={() => {
						signOutUser();
					}}
				>
					Log Out
				</Button>
			</Container>
		</Header>
	);
}
