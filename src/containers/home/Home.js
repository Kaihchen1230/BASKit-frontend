import React, { useState } from 'react';
import { Container, Grid, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';

import Input from '../../components/UI/input/Input';
import ImageCard from '../../components/UI/imageCard/ImageCard';
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

	const [searchButtonClicked, setSearchButtonClicked] = useState(false);
	const [searchResults, setSearchResults] = useState([]);

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

		const API = '563492ad6f91700001000001ebd7d3cccfca49aaac590541ade3b46b';
		const url = `https://api.pexels.com/v1/search?`;

		setSearchButtonClicked(true);
		try {
			const { data } = await axios.get(url, {
				headers: {
					Authorization: API,
				},
				params: {
					query: searchFormControl.searchField.value,
					per_page: '6',
				},
			});

			const imageUrls = data.photos.map((imgUrl) => imgUrl.src.medium);
			console.log('imageUrls: ', imageUrls);
			setSearchResults(imageUrls);
		} catch (err) {
			console.log('there is an error: ', err);
		}
	};

	const handleAddPhoto = (photoUrl) => {
		props.onAddPhoto(props.username, photoUrl);
	};

	let imageArea = null;

	if (searchButtonClicked) {
		if (searchResults.length > 0) {
			imageArea = searchResults.map((imgUrl) => (
				<Grid key={imgUrl} item xs={12} sm={4} md={4} lg={4}>
					<ImageCard
						imgUrl={imgUrl}
						buttonName='Add'
						handleClick={handleAddPhoto}
					/>
				</Grid>
			));
		} else {
			imageArea = (
				<Typography variant='p' component='p'>
					There is no image matched with the search term, please try again ...
				</Typography>
			);
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

	return (
		<Container fixed>
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
			<Grid container spacing={1}>
				{imageArea}
			</Grid>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		username: state.username,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddPhoto: (username, photoUrl) =>
			dispatch(actions.addPhoto(username, photoUrl)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
