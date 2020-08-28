import React, { useState } from 'react';
import { Container, Grid, Button } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';

import Input from '../../components/UI/input/Input';
import ImageCard from '../../components/UI/imageCard/ImageCard';
import AlertMessage from '../../components/UI/alert/AlertMessage';
import Spinner from '../../components/UI/spinner/Spinner';
import * as actions from '../../store/actions/auth';

const Home = (props) => {
	const [searchFormControl, setSearchFormControl] = useState({
		searchField: {
			elementType: 'input',
			elementConfig: {
				label: 'Search',
				type: 'text',
				helperText: '',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
	});

	const [loading, setLoading] = useState(false);
	const [searchButtonClicked, setSearchButtonClicked] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [alertSeverity, setAlertSeverity] = useState('');
	const [alertMessage, setAlertMessage] = useState('');

	const checkValidity = (value, rules) => {
		let isValid = true;

		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		return isValid;
	};

	const inputChangedHandler = (event, controlName) => {
		event.persist();
		setSearchFormControl((prevState) => ({
			...prevState,
			[controlName]: {
				...prevState[controlName],
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					prevState[controlName].validation,
				),
				touched: true,
			},
		}));
	};

	const handleSearch = async (event) => {
		event.preventDefault();

		setSearchButtonClicked(true);
		setLoading(true);
		try {
			const { data } = await axios({
				method: 'POST',
				url: 'http://localhost:5000/search-photo',
				data: {
					username: props.username,
					password: props.password,
					searchTerm: searchFormControl.searchField.value,
				},
			});

			console.log('this is data in search : ', data.photos);
			setAlertSeverity('');
			setAlertMessage('');

			setSearchResults(data.photos);
		} catch (err) {
			console.log('there is an error in search: ', err.response.data.message);
			setAlertSeverity('error');
			setAlertMessage(err.response.data.message);
			setSearchResults([]);
		}
		setLoading(false);
	};

	const handleAddPhoto = async (photoUrl) => {
		// setLoading(true);
		try {
			const { data } = await axios({
				method: 'POST',
				url: 'http://localhost:5000/save-photo',
				data: {
					username: props.username,
					password: props.password,
					photoUrl: photoUrl,
				},
			});
			setAlertMessage();
			// console.log('this is the data: ', data);
			setAlertMessage(data.message);
			setAlertSeverity('success');
			props.addPhotoSuccess(photoUrl);
		} catch (err) {
			console.log('there is an error to add to photo:  ', err);
			setAlertMessage(err.response.data.message);
			setAlertSeverity('error');
		}
		// setLoading(false);
	};

	let imageArea = null;

	if (searchButtonClicked) {
		if (searchResults.length > 0) {
			imageArea = searchResults.map((photoUrl) => (
				<Grid key={photoUrl} item xs={12} sm={4} md={4} lg={4}>
					<ImageCard
						photoUrl={photoUrl}
						buttonName='Add'
						handleClick={handleAddPhoto}
					/>
				</Grid>
			));
		}
	}

	const searchField = (
		<Input
			elementConfig={searchFormControl.searchField.elementConfig}
			value={searchFormControl.searchField.value}
			invalid={!searchFormControl.searchField.valid}
			touched={searchFormControl.searchField.touched}
			fullWidth={true}
			changed={(event) => inputChangedHandler(event, 'searchField')}
		/>
	);

	let alertComponent = null;

	if (alertMessage) {
		alertComponent = (
			<AlertMessage severity={alertSeverity} message={alertMessage} />
		);
	}

	return (
		<Container fixed>
			{alertComponent}
			<form onSubmit={handleSearch}>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={11} md={11} lg={11}>
						{searchField}
					</Grid>
					<Grid item xs={12} sm={1} md={1} lg={1}>
						<Button
							variant='contained'
							color='primary'
							size='small'
							style={{ margin: '20px' }}
							type='submit'
							disabled={
								!(
									searchFormControl.searchField.touched &&
									searchFormControl.searchField.valid
								)
							}>
							Search
						</Button>
					</Grid>
				</Grid>
			</form>
			{loading ? (
				<Spinner />
			) : (
				<Grid container spacing={1}>
					{imageArea}
				</Grid>
			)}
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		username: state.username,
		password: state.password,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddPhoto: (username, password, photoInfo) =>
			dispatch(actions.addPhoto(username, password, photoInfo)),

		addPhotoSuccess: (photoUrl) => dispatch(actions.addPhotoSuccess(photoUrl)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
