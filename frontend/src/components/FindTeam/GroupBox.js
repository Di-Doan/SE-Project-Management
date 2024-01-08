import TeamStyle from "./FindTeam.module.css";

function GroupBox(props) {
  console.log(props.members);
  return (
    <div className={TeamStyle.groupBox}>
      <div className={TeamStyle.groupHeader}>
        <div className={TeamStyle.groupTitle}>
          <h2 className={TeamStyle.groupLabel}>{props.name}</h2>
        </div>
        <span className={TeamStyle.groupStudent}>{props.members} students</span>
        <span className={TeamStyle.groupJoin}>
          <button className={TeamStyle.joinBtn}>Join Group</button>
        </span>
      </div>
    </div>
  );
}

export default GroupBox;
