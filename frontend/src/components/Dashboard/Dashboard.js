import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import axios from "axios";
import  axiosInstance  from '../../ultilities/axiosInstance.js';
import { jwtDecode } from "jwt-decode";

import resets from './_resets.module.css';
import classes from './Design.module.css';
import { Ellipse2552Icon2 } from './Ellipse2552Icon2.tsx';
import { Ellipse2552Icon3 } from './Ellipse2552Icon3.tsx';
import { Ellipse2552Icon4 } from './Ellipse2552Icon4.tsx';
import { Ellipse2552Icon } from './Ellipse2552Icon.tsx';
import { Ellipse2615Icon } from './Ellipse2615Icon.tsx';
import { Ellipse2616Icon } from './Ellipse2616Icon.tsx';
import { Ellipse2617Icon } from './Ellipse2617Icon.tsx';
import { Group1000004376Icon } from './Group1000004376Icon.tsx';
import { Group1000004379Icon } from './Group1000004379Icon.tsx';
import { Group1000004380Icon } from './Group1000004380Icon.tsx';
import { Group1000004420Icon } from './Group1000004420Icon.tsx';
import { Group1000004421Icon } from './Group1000004421Icon.tsx';
import { Group1000004422Icon2 } from './Group1000004422Icon2.tsx';
import { Group1000004422Icon } from './Group1000004422Icon.tsx';
import { UiIconMessageLightIcon } from './UiIconMessageLightIcon.tsx';
import { UiIconNotificationLightIcon } from './UiIconNotificationLightIcon.tsx';
import { UiIconSearchLightIcon } from './UiIconSearchLightIcon.tsx';
import { VectorIcon2 } from './VectorIcon2.tsx';
import { VectorIcon3 } from './VectorIcon3.tsx';
import { VectorIcon4 } from './VectorIcon4.tsx';
import { VectorIcon5 } from './VectorIcon5.tsx';
import rmitLogo from './rmit-logo.png';
import { ReactComponent as HomeIcon } from './home-icon.svg';

const Props = {
  className: undefined,
};

function Dashboard() {
  const [user, setUser] = useState({});
  const [oldData, setOldData] = useState();
  const [auth, setAuth] = useState(false);

  if (auth) {
    window.location = "/login";
  }

  const getData = async () => {
    try {
      const response = await axiosInstance.get("/profile");
      setUser(response.data.user);
      setOldData(response.data.user);
    } catch (error) {
      if (error) {
        setAuth(true);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle5695}></div>
      <div className={classes.ellipse2615}>
        <Ellipse2615Icon className={classes.icon} />
      </div>
      <div className={classes.ellipse2616}>
        <Ellipse2616Icon className={classes.icon2} />
      </div>
      <div className={classes.ellipse2617}>
        <Ellipse2617Icon className={classes.icon3} />
      </div>
      <div className={classes.dashboard}>
        <div className={classes.sidebar}>
          <div>
            <img src={rmitLogo} alt="RMIT Logo" className={classes.rMITLogo_Horizontal1} />
          </div>
          <div className={classes.account}>Account</div>
          <div className={classes.rectangle5571}></div>
          <Link to="/Dashboard" className={classes.sidebarLink}>
            <div className={classes.dashboard2}>Dashboard</div>
            <div className={classes.vector}>
              <HomeIcon className={classes.icon4} />
            </div>
          </Link>
          <div className={classes.courses}>Courses</div>
          <div className={classes.group1000004376}>
            <Group1000004376Icon className={classes.icon5} />
          </div>
          <Link to="/Login" className={classes.sidebarLink}>
            <div className={classes.messages}>Messages</div>
            <div className={classes.group1000004379}>
              <Group1000004379Icon className={classes.icon8} />
            </div>
          </Link>
          <div className={classes.settings}>Settings</div>
          <div className={classes.group1000004380}>
            <Group1000004380Icon className={classes.icon9} />
          </div>
        </div>
        <div className={classes.topBar}>
          <div className={classes.searchBox}>
            <div className={classes.searchInput}>
              <div className={classes.left}>
                <div className={classes.uIIconSearchLight}>
                  <UiIconSearchLightIcon className={classes.icon11} />
                </div>
                <div className={classes.frame22}>
                  <input type="text" placeholder="Search or type" className={classes.searchOrType} />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.rightBlock}>
            <div className={classes.message}>
              <div className={classes.uIIconMessageLight}>
                <UiIconMessageLightIcon className={classes.icon12} />
              </div>
              <div className={classes.frame26}></div>
            </div>
            <div className={classes.notification}>
              <div className={classes.uIIconNotificationLight}>
                <UiIconNotificationLightIcon className={classes.icon13} />
              </div>
              <div className={classes.frame262}></div>
            </div>
            <div className={classes.avatar}>
              <div className={classes.customer11}></div>
            </div>
          </div>
        </div>
        <div className={classes.rectangle5594}></div>
        <div className={classes.rectangle5597}></div>
        <div className={classes.image233}></div>
        <div className={classes._3DAnimationConference}>3D Animation Conference</div>
        <div className={classes.december14830PM}>December 14, 08:30 PM</div>
        <div className={classes.vector2}>
          <VectorIcon2 className={classes.icon14} />
        </div>
        <div className={classes.rectangle55972}></div>
        <div className={classes.image2332}></div>
        <div className={classes.image234}></div>
        <div className={classes.handleUXResearch}>Handle UX Research</div>
        <div className={classes.december181030PM}>December 18, 10:30 PM</div>
        <div className={classes.vector3}>
          <VectorIcon3 className={classes.icon15} />
        </div>
        <div className={classes.rectangle55973}></div>
        <div className={classes.image2333}></div>
        <div className={classes.image235}></div>
        <div className={classes.image237}></div>
        <div className={classes.machineLearningLesson}>Machine Learning Lesson</div>
        <div className={classes.december181030PM2}>December 18, 10:30 PM</div>
        <div className={classes.vector4}>
          <VectorIcon4 className={classes.icon16} />
        </div>
        <div className={classes.rectangle55974}></div>
        <div className={classes.image2334}></div>
        <div className={classes.image236}></div>
        <div className={classes._3DAnimationConference2}>3D Animation Conference</div>
        <div className={classes.december221030PM}>December 22, 10:30 PM</div>
        <div className={classes.vector5}>
          <VectorIcon5 className={classes.icon17} />
        </div>
        <div className={classes.myPlanning}>My Planning </div>
        <div className={classes.rectangle5593}></div>
        <div className={classes.week}>Week</div>
        <div className={classes.rectangle5606}></div>
        <div className={classes.topTutors}>Top Tutors</div>
        <div className={classes.rectangle5592}></div>
        <div className={classes.ellipse2552}>
          <Ellipse2552Icon className={classes.icon20} />
        </div>
        <div className={classes.annaKarlos}>Anna Karlos</div>
        <div className={classes.programming}>Programming</div>
        <div className={classes.rectangle55922}></div>
        <div className={classes.ellipse25522}>
          <Ellipse2552Icon2 className={classes.icon22} />
        </div>
        <div className={classes.karlaMay}>Karla May</div>
        <div className={classes.maths}>Maths</div>
        <div className={classes.rectangle55923}></div>
        <div className={classes.ellipse25523}>
          <Ellipse2552Icon3 className={classes.icon24} />
        </div>
        <div className={classes.billJesson}>Bill Jesson</div>
        <div className={classes.design}>Design</div>
        <div className={classes.rectangle55924}></div>
        <div className={classes.ellipse25524}>
          <Ellipse2552Icon4 className={classes.icon26} />
        </div>
        <div className={classes.alanBaker}>Alan Baker</div>
        <div className={classes.physics}>Physics</div>
        <div className={classes.rectangle5607}></div>
        <div className={classes.completedCourse}>Completed Course</div>
        <div className={classes.group1000004421}>
          <Group1000004421Icon className={classes.icon28} />
        </div>
        <div className={classes.javaCode}>Java Code</div>
        <div className={classes._75100}>75/100</div>
        <div className={classes.group1000004420}>
          <Group1000004420Icon className={classes.icon29} />
        </div>
        <div className={classes.designBasic}>Design Basic</div>
        <div className={classes._65100}>65/100</div>
        <div className={classes.group1000004422}>
          <Group1000004422Icon className={classes.icon30} />
        </div>
        <div className={classes.teamBuilding}>Team Building</div>
        <div className={classes._30100}>30/100</div>
        <div className={classes.group10000044222}>
          <Group1000004422Icon2 className={classes.icon31} />
        </div>
        <div className={classes.businessMarketing}>Business Marketing</div>
        <div className={classes._20100}>20/100</div>
        <div className={classes.frame27}>
          <div className={classes.rectangle55942}></div>
          <div className={classes.courses2}>Current Courses</div>
          <div className={classes.rectangle55932}></div>
          <div className={classes.currentSemester}>Current Semester</div>
          <div className={classes.rectangle55976}></div>
          <div className={classes.image2336}></div>
          <div className={classes._3DAnimationConference4}>
            {user && user.courses && user.courses[0] ? user.courses[0].name : "empty"}
          </div>
          <div className={classes.december221030PM3}>December 22, 10:30 PM</div>
          <div className={classes.rectangle55977}></div>
          <div className={classes.image2364}></div>
          <div className={classes._3DAnimationConference5}>
          3D Animation Conference
          </div>
          <div className={classes.december221030PM4}>December 22, 10:30 PM</div>
          <div className={classes.rectangle55978}></div>
          <div className={classes.image2338}></div>
          <div className={classes._3DAnimationConference6}>3D Animation Conference</div>
          <div className={classes.december221030PM5}>December 22, 10:30 PM</div>
          <div className={classes.rectangle55979}></div>
          <div className={classes.image2366}></div>
          <div className={classes._3DAnimationConference7}>3D Animation Conference</div>
          <div className={classes.december221030PM6}>December 22, 10:30 PM</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
