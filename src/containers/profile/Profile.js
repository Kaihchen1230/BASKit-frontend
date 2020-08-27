import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileCard from '../../components/UI/profileCard/ProfileCard';
import ImageCard from '../../components/UI/imageCard/ImageCard';
import * as actions from '../../store/actions/auth';

const Profile = (props) => {
	const handleDeletePhoto = (imgUrl) => {
		props.onDeletePhoto(props.username, imgUrl);
	};

	let gallerySection = (
		<Typography variant='p' component='p'>
			You haven't saved any images yet, click <Link to='/home'>here</Link> to
			search some amazing images!
		</Typography>
	);

	if (props.gallery.length > 0) {
		console.log('this is props.gallery: ', props.gallery);
		gallerySection = props.gallery.map((imgUrl) => (
			<Grid key={imgUrl} item xs={12} sm={4} md={4} lg={4}>
				<ImageCard
					imgUrl={imgUrl}
					buttonName='Delete'
					handleClick={handleDeletePhoto}
				/>
			</Grid>
		));
	}

	return (
		<Container fixed>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={4} md={4}>
					<ProfileCard props={props} />
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
		gallery: state.gallery,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDeletePhoto: (username, photoUrl) =>
			dispatch(actions.deletePhoto(username, photoUrl)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
