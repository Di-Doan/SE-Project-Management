import TeamStyle from "./FindTeam.module.css";
import axiosInstance from "../../ultilities/axiosInstance";

function GroupBox(props) {
  const joinGroup = async () => {
    try {
      const response = await axiosInstance.post(
        `/courses/${props.courseId}/teams/${props.teamId}/students`
      );
    } catch (error) {console.log(error.response)}
  };

  return (
    <div className={TeamStyle.groupBox}>
      <div className={TeamStyle.groupHeader}>
        <div className={TeamStyle.groupTitle}>
          <h2 className={TeamStyle.groupLabel}>{props.name}</h2>
        </div>
        <span className={TeamStyle.groupStudent}>{props.member} students</span>
        <span className={TeamStyle.groupJoin}>
          <button className={TeamStyle.joinBtn} onClick={joinGroup}>Join Group</button>
        </span>
      </div>
    </div>
  );
}

export default GroupBox;
