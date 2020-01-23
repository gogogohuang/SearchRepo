import React, { Component } from "react";
import { TAGS } from "../../common/constant";
import "./_dragged.scss";

const arrayMoveMutate = (array, start, to) => {
  const _arr = [...array];

	const startIndex = to < 0 ? _arr.length + to : to;
	const item = _arr.splice(start, 1)[0];
  _arr.splice(startIndex, 0, item);

  return _arr;
};

class DraggedTags extends Component {
  state = {
    tags: TAGS,
    draggedTag: null
  };

  handleDragStart = e => {
    e.dataTransfer.effectAllowed = "none";
    this.setState({ draggedTag:e.target.id });
  };

  handleDragOver = e => {
    const { tags, draggedTag } = this.state;
    const overTagIdx = this.state.tags.indexOf(e.target.id);
    const draggedTagIdx =this.state.tags.indexOf(draggedTag);

    if (draggedTagIdx !== overTagIdx) {
      const updatedTags = arrayMoveMutate(tags, draggedTagIdx, overTagIdx);

      this.setState({ tags: updatedTags });
    }
  };

  renderTags = () =>
    this.state.tags.map(tag => (
      <div
        className="tag"
        id={tag}
        draggable
        onDragStart={this.handleDragStart}
        onDragLeave={this.handleDragOver}
      >
        {tag}
      </div>
    ));

  render() {
    return (
      <div className="container">
        <div className="tags-container">{this.renderTags()}</div>
      </div>
    );
  }
}

export default DraggedTags;
