import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import logomanage from './logomanage.png';
import style from './style.module.css';


const SideNav = (props) => {
    return (
        <div className={style.Container}>
            <Nav className={style.sidenav} vertical>
                <img className={style.logoimg}
                    width="200px"
                    src={logomanage}
                    alt="logo" />
                <NavItem className={style.navitem}>
                    <NavLink className={style.navlink} href="/manage/attendance">Attendance</NavLink>
                    <hr></hr>
                </NavItem>
                <NavItem className={style.navitem}>
                    <NavLink className={style.navlink} href="/manage/members">Members</NavLink>
                    <hr></hr>
                </NavItem >
                <NavItem className={style.navitem}>
                    <NavLink className={style.navlink} href="/manage/trainers">Trainers</NavLink>
                    <hr></hr>
                </NavItem>
                <NavItem className={style.navitem}>
                    <NavLink className={style.navlink} href="/manage/classes">Scheduler</NavLink>
                    <hr></hr>
                </NavItem>
            </Nav>
        </div>
    );
}

export default SideNav;