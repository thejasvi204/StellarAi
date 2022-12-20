import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

const AuthContext = createContext({} as any);

interface AuthProps {
	children?: ReactNode;
}

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProps) => {
	const [currentUser, setCurrentUser] = useState<User | null>();
	const [loading, setLoading] = useState<boolean>(true);

	const signUpUser = async (email: string, password: string, name: string) => {
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			try {
				const docRef = await addDoc(collection(db, 'users'), {
					UID: user.uid,
					name: name,
					email: email,
				});
				console.log('Document written with ID: ', docRef.id);
			} catch (e) {
				console.error('Error adding document: ', e);
			}
		} catch (e) {
			console.log('Error creating user', e);
		}
	};

	const signInUser = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	};

	const signOutUser = async () => {
		await signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe; // come back
	}, []);

	const value = {
		currentUser,
		signUpUser,
		signInUser,
		signOutUser,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
