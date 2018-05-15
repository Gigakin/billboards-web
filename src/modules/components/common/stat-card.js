// Modules
import React from "react";

// Classes
class StatCard extends React.Component {
  render() {
    let { count, title, theme } = this.props;
    return (
      <div className={`stat-card stat-card--${theme}`}>
        <div className="stat-card__count">{count}</div>
        <div className="stat-card__title">{title}</div>
      </div>
    );
  }
}

// Default Props
StatCard.defaultProps = {
  count: 0,
  title: null,
  theme: "default"
};

// Exports
export default StatCard;
