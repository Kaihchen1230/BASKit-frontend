import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	IconButton,
	Popper,
	Grow,
	Paper,
	ClickAwayListener,
	MenuList,
	MenuItem,
	Link,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const ProfileArea = (props) => {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<div>
			<IconButton
				ref={anchorRef}
				aria-controls={open ? 'menu-list-grow' : undefined}
				aria-haspopup='true'
				color='inherit'
				onClick={handleToggle}
			>
				<AccountCircle fontSize='large' />
			</IconButton>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom' ? 'center top' : 'center bottom',
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id='menu-list-grow'
									onKeyDown={handleListKeyDown}
								>
									<MenuItem onClick={handleClose}>
										<Link
											component={RouterLink}
											to='/profile'
											underline='none'
											color='textPrimary'
										>
											My Profile
										</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>Logout</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
};

export default ProfileArea;
