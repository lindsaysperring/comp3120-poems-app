import React from 'react'

export default function AddPoem() {
    return (
        <div>
            <form>
                <div className="row">
                    <div className="six columns">
                        <label for="author">Your Name</label>
                        <input className="u-full-width" type="text" placeholder="Bob Loblaw" id="author"/>
                    </div>
                    <div className="six columns">
                        <label for="title">Poem Title</label>
                        <input className="u-full-width" type="text" placeholder="Crazy Awesome Title" id="title"/>
                    </div>
                </div>
                <div className="row">
                    <div className="twelve columns">
                        <label for="poemContent">Poem Content</label>
                        <textarea className="u-full-width" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus." id="poemContent"></textarea>
                    </div>
                </div>
                <input class="darkButton" type="submit" value="Submit"></input>
            </form>
        </div>
    )
}
