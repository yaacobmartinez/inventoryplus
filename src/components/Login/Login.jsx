import React, { useState } from "react";
import {
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	makeStyles,
	Container,
	Backdrop,
	CircularProgress,
	Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useLoginForm } from "../utils/useForm";
import Axios from "axios";
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
}));

export default function SignIn() {
	const classes = useStyles();
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const submit = (setToken) => {
		if (!values.identifier) {
			setError({ ...error, identifier: true });
			return;
		}
		if (!values.password) {
			setError({ ...error, password: true });
			return;
		}
		setError({});
		setIsLoading(true);
		const auth = async () => {
			Axios({
				method: "POST",
				url: "auth/local",
				data: values,
				validateStatus: (status) => {
					return true;
				},
			})
				.then((res) => {
					if (res.status === 400) {
						setError({ ...error, both: true });
						setIsLoading(false);
						return;
					}
					setToken(res.data.jwt);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		auth();
	};
	const state = { identifier: "", password: "" };
	const [values, handleChange, handleSubmit] = useLoginForm(state, submit);

	return (
		<Container component='main' maxWidth='xs'>
			<Backdrop className={classes.backdrop} open={isLoading}>
				<CircularProgress color='inherit' />
			</Backdrop>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					inventoryPlus
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='Email Address/Username'
						name='identifier'
						autoFocus
						error={error.identifier}
						helperText={
							error.identifier
								? "We couldn't find an account with that username."
								: null
						}
						values={values.identifier}
						onChange={handleChange}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						autoComplete='current-password'
						error={error.password}
						helperText={error.password ? "Hey your password is wrong." : null}
						values={values.password}
						onChange={handleChange}
					/>
					<Snackbar
						anchorOrigin={{ vertical: "top", horizontal: "center" }}
						open={error.both}
						autoHideDuration={6000}>
						<Alert variant='filled' severity='error'>
							Your username and/or password might be incorrect.
						</Alert>
					</Snackbar>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						onClick={handleSubmit}
						className={classes.submit}>
						Sign In
					</Button>

					<Grid container>
						<Grid item xs>
							<Link href='/forgot' variant='body2'>
								Forgot password?
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
