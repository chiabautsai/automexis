const script = `
const curentElement = document.currentScript;
const currentPost = curentElement.closest('.t_row');
const avatar = currentPost.querySelector('.avatar > img');
const postContent = curentElement.closest('td.line');

((parent) => { for (let i = parent.children.length - 2; i >= 0; i--) {
  if (i === 18 || i >= 7) {
      postContent.removeChild(parent.children[i]);
  }
}}) (postContent);
`;

const data = {
  script: script,
};


export default data;