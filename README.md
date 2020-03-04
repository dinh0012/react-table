# react-table

css three dots

.list-news .title-news {/* hide text if it more than N lines  */
/* hide text if it more than N lines  */
  overflow: hidden;
  /* for set '...' in absolute position */
  position: relative; 
  /* use this value to count block height */
  line-height: 1.2em;
  /* max-height = line-height (1.2) * lines max number (3) */
  max-height: 3.6em; 
  /* fix problem when last visible word doesn't adjoin right side  */
  text-align: justify;  
  /* place for '...' */
  margin-right: -1em;
  padding-right: 1em;
}

.list-news .title-news:before {/* points in the end */
    content: '...';
  /* absolute position */
    position: absolute;
  /* set position to right bottom corner of block */
    right: 0;
    bottom: 0;
}
.list-news .title-news:after {
  /* points in the end */
  content: '';
  /* absolute position */
  position: absolute;
  /* set position to right bottom corner of text */
  right: 0;
  /* set width and height */
  width: 1em;
  height: 1em;
  margin-top: 0.2em;
  /* bg color = bg color under block */
  background: white;
}
