// get all of the message elemenets
let messages = document.querySelectorAll('article.message');
for (let i=0; i<messages.length; i++){
  let message = messages[i];
  // find the corresponding reactions url for each message
  let message_id = message.id.split('-')[2];
  let reactions_url = `https://forum.bazicenter.com/posts/${message_id}/reactions`;
  // fetch the reactions and display the results
  fetch(reactions_url).then(
      response => response.text()
  ).then(
      data => {
        let doc = document.implementation.createHTMLDocument('');
        doc.body.innerHTML = data;
        try {
            reactions_elem = doc.querySelector('.block-minorTabHeader > span')
            let reactions_clickable = document.createElement('a');
            reactions_clickable.setAttribute('href', reactions_url);
            reactions_clickable.innerHTML = reactions_elem.innerHTML;
            message.appendChild(reactions_clickable)
        }
        catch {
            console.log(`No reactions for post #${message_id}`)
        }

      }
  )
}