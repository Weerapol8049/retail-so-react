import {
	Avatar,
	Button,
	FilledInput,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Paper,
	TextField,
	Typography,
	withStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Controls from '../components/controls/Controls';
import { useForm, Form } from '../components/useForm';
import { ACTION_TYPES } from '../actions/order';
import * as actions from '../actions/order';
import { connect } from 'react-redux';

const styles = (theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			minWidth: 230,
		},
	},
	paper: {
		//position: 'absolute',
		width: '696px',
		heigth: '434px',
		left: '335px',
		marginTop: '111px',
	},
	// paper: {
	//     textAlign: 'center',
	//     height:'100%',
	//     marginTop: '5%',
	//     marginLeft: '25%',
	//     marginRight: '25%',
	//     marginButtom: '5%',
	//     padding: theme.spacing(2),
	//     //backgroundImage: `url(${"/images/starmark_01.jpg"})`
	// },
	gridRight: {
		backgroundImage: `url(${'/images/Login-component_1.png'})`,
		width: '696px',
		heigth: '800px',
		marginLeft: '335px',
		marginTop: '111px',
	},
	gridItem: {
		textAlign: 'center',
		alignItems: 'center',
		paddingTop: '20%',
	},

	textField: {
		width: '60%',
		margin: theme.spacing(1),
	},
	logoSize: {
		marginLeft: '30%',
		width: theme.spacing(30),
		height: theme.spacing(20),
	},
});

const StyledButton = withStyles({
	root: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		borderRadius: 3,
		border: 0,
		color: 'white',
		height: 48,
		width: 200,
		padding: '0 30px',
		boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
	},
	label: {
		textTransform: 'capitalize',
	},
})(Button);

const initialFieldValue = {
	id: 0,
	userName: '',
	password: '',
	showPassword: false,
};

const Login = ({ classes, ...props }) => {
	const [values, setValues] = useState(initialFieldValue);

	const API = {};

	useEffect(() => {}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handlePasswordChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const onSuccess = () => {
			console.log('Submitted successfully.');
		};

		props.fetchLoginOrder(values.userName, values.password, onSuccess);
	};

	return (
		<Paper
			style={{
				width: '687px',
				height: '434px',
				marginLeft: '335px',
				marginTop: '111px'
				
			}}
			elevation={3}
		>
			<form autocomq="off" container className={classes.root} onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<img
							src="/images/LOGO_STARMARK.png"
							style={{ marginLeft: '20px', width: '138px', height: '50px' }}
						></img>
						<Typography variant="h6" gutterBottom style={{ marginLeft: '10%', marginTop: '50px' }}>
							ลงชื่อเข้าใช้งาน
						</Typography>
						<Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10%' }}>
							Retail - SO
						</Typography>
						<Grid xs={12} style={{ marginLeft: '8%', marginRight: '10%',marginTop:'10%' }}>
							<TextField
								name="userName"
								label="User Name"
								variant="outlined"
								size="small"
								value={values.userName}
								onChange={handleInputChange}
								fullWidth
							/>
						</Grid>
						<Grid xs={12} style={{ marginLeft: '10%', marginRight: '10%' }}>
							<FormControl size="small" variant="outlined" fullWidth>
								<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
								<OutlinedInput
									type={values.showPassword ? 'text' : 'password'}
									value={values.password}
									onChange={handlePasswordChange('password')}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{values.showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={70}
								/>
							</FormControl>
						</Grid>
						<div style={{ marginLeft: '10%', marginRight: '10%' }}></div>

						<div
							style={{ paddingTop: '10%', paddingLeft: '20%', paddingRight: '20%', paddingbottom: '20%' }}
						>
							<StyledButton type="submit" style={{ alignItems: 'center' }}>
								เข้าสู่ระบบ
							</StyledButton>
						</div>
					</Grid>
					<Grid
						item
						xs={6}
						style={{
							height: '434px',
							padding:'0px'
						}}
					>
						<img src="/images/Login-component_1.png"></img>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
};

export default withStyles(styles)(Login);

// const mapStateToProps = state => ({
//     orderList: state.order.list
// })

// const mapActionToProps = {
//     fetchLoginOrder: actions.fetchLogin
// }

// export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(Login));
