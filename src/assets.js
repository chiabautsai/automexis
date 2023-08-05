const script = `
const theScriptElement = document.currentScript;
addEventListener("DOMContentLoaded", () => {
  const currentPost = theScriptElement.closest('.t_row');
  const avatar = currentPost.querySelector('.avatar > img');
  const postContent = theScriptElement.closest('td.line');
  const postContentChildren = postContent.children;
  const postContentText = postContent.querySelector('.t_msgfont');
  const disclaimerTable = postContent.querySelector('tr:nth-child(2) > td > table');
  const signature = currentPost.querySelector('td:nth-child(2) tr:nth-child(3)');
  const modHistory = postContent.querySelector('font');

  document.querySelector('.thread-content').style.setProperty('margin-bottom','2.5em');
  
  ((parent) => { for (let x = postContentChildren.length - 2; x >= 0; x--) {
    if (x === 18 || x >= 7) {
        postContent.removeChild(postContentChildren[x]);
    }
  }}) (postContent);
  
  ((disclaimerContainer) => {
    const disclaimerInner = disclaimerContainer.querySelector('td');
  
    disclaimerContainer.width = '91%';
    disclaimerContainer.style.maxWidth = '640px';
    disclaimerContainer.style.setProperty('border-collapse', 'collapse', 'important');
    disclaimerContainer.style.setProperty('margin','8px 30px');

    disclaimerInner.style.padding = '16px';
    disclaimerInner.style.backgroundColor = '#ffba0005';
    return true;
  }) (disclaimerTable);
  
  ((signatureContainer) => {
    const signatureTd = signatureContainer.firstChild;
    const signatureDiv = signatureTd.querySelector('div');
  
    [...signatureTd.children].forEach((child) => (child.tagName === 'BR' ? signatureTd.removeChild(child) : ''));
    signatureTd.querySelector('img').style.display = 'block';
    signatureTd.style.padding = '25px 10px';

    signatureDiv.style.float = 'left';
    signatureDiv.style.setProperty('margin', '5px auto 5px');
    signatureDiv.style.setProperty('padding', '5px 10px');
    signatureDiv.style.maxWidth = '840px';
  }) (signature);

  ((modHistoryContainer) => {
    const fieldSet = modHistoryContainer.querySelector('fieldset');
    fieldSet.style.setProperty('border', '0px');
    fieldSet.style.setProperty('background-color', '#f1f3f4');
    fieldSet.style.setProperty('padding', '20px 10px');
    fieldSet.style.setProperty('max-width', '620px');
    fieldSet.style.setProperty('margin', '0px 30px');
    [...fieldSet.children].forEach((child) => (child.tagName === 'BR' ? fieldSet.removeChild(child) : ''));
  }) (modHistory);

  ((postContentText) => {
    if (postContentText.lastElementChild.tagName === 'I') {
      const editionData = postContentText.lastElementChild.textContent.trim();
      const toBeRemoved = [];
      postContentText.childNodes.forEach((node) => {
          if (node.textContent === '\n\n[' || 
              node.textContent === ']' ||
              node.nodeName === 'I' ) {
              toBeRemoved.push(node);
          }
      });
      toBeRemoved.forEach((e) => postContentText.removeChild(e));
      const newDivWrapper = document.createElement("div");
      const newDiv = document.createElement("div");
      const newContent = document.createTextNode(editionData);
      newDiv.appendChild(newContent);
      newDivWrapper.appendChild(newDiv);
      postContentText.appendChild(newDivWrapper);

      newDivWrapper.style.setProperty('max-width', '640px');
      newDivWrapper.style.setProperty('margin', '0px 30px');
      newDiv.style.setProperty('padding', '15px 30px');
      newDiv.style.setProperty('background-color', '#f1f3f4');
      newDiv.style.setProperty('border-left', '4px solid #ffa602');
    }
  }) (postContentText);
});
`;

const data = {
  script: script,
};


export default data;