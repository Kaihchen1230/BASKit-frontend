import React, { useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ProfileCard from '../../components/UI/profileCard/ProfileCard';
import ImageCard from '../../components/UI/imageCard/ImageCard';
import AlertMessage from '../../components/UI/alert/AlertMessage';
import * as actions from '../../store/actions/auth';

const Profile = (props) => {
	const [alertSeverity, setAlertSeverity] = useState('');
	const [alertMessage, setAlertMessage] = useState('');

	const handleDeletePhoto = async (photoUrl) => {
		try {
			const { data } = await axios({
				method: 'POST',
				url: 'http://18.234.136.82:5000/delete-photo',
				data: {
					username: props.username,
					password: props.password,
					photoUrl: photoUrl,
				},
			});

			setAlertSeverity('success');
			setAlertMessage(data.message);
			props.deletePhotoSuccess(data.gallery);
		} catch (err) {}
	};

	const handleShowAlert = (severity, message) => {
		setAlertSeverity(severity);
		setAlertMessage(message);
	};

	let gallerySection = (
		<Typography variant='p' component='p'>
			You haven't saved any images yet, click <Link to='/home'>here</Link> to
			search some amazing images!
		</Typography>
	);

	if (props.gallery.length > 0) {
		gallerySection = props.gallery.map((photoUrl) => (
			<Grid key={photoUrl} item xs={12} sm={4} md={4} lg={4}>
				<ImageCard
					photoUrl={photoUrl}
					buttonName='Delete'
					handleClick={handleDeletePhoto}
				/>
			</Grid>
		));
	}

	let alertComponent = null;

	if (alertMessage) {
		alertComponent = (
			<AlertMessage severity={alertSeverity} message={alertMessage} />
		);
	}

	return (
		<Container fixed>
			{alertComponent}
			<Grid container spacing={3}>
				<Grid item xs={12} sm={4} md={4}>
					<ProfileCard props={props} handleShowAlert={handleShowAlert} />
				</Grid>
				<Grid item xs={12} sm={8} md={8}>
					<Grid container spacing={2}>
						{gallerySection}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		username: state.username,
		password: state.password,
		gallery: state.gallery,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deletePhotoSuccess: (gallery) =>
			dispatch(actions.deletePhotoSuccess(gallery)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
