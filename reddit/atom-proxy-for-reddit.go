/* Atom Proxy for Reddit

This tool lets you request specific subreddits via ATOM and generates its own ATOM feed for them

Just request https://yourdomain.com/?r=name_of_subreddit to get a feed for https://www.reddit.com/r/name_of_subreddit

The tool exists to deal with Feedly being blocked for (presumably) excessive requests to Reddit

Next step is to get running on AWS Lambda

Note I have vendored-in the rss module so I can add a needed User-Agent for the requests.
A simple reverse proxy might do the same job but this was quicker for me as I had previous code

I run this on an EC2 instance behind a Caddy server which gave me a Let's Encrypt Cert for free

Copyright © 2017 Conor O'Neill, conor@conoroneill.com

License MIT
*/

//TODO: Better error handling

package main

import (
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/SlyMarbo/rss"
	"github.com/gorilla/feeds"
)

func allSubreddits(w http.ResponseWriter, r *http.Request) {
	subReddit := r.URL.Query().Get("r")

	genFeed(w, "https://www.reddit.com/r/"+subReddit)
}

func genFeed(w http.ResponseWriter, feedURL string) {

	inputFeed, err := rss.Fetch(feedURL + ".rss")

	if err != nil {
		fmt.Println(err)
		io.WriteString(w, "Error from Reddit")
	} else {

		fmt.Println(time.Now().Format(time.RFC850), " ", inputFeed.Title)

		var RSSXML = &feeds.Feed{
			Title:       inputFeed.Title,
			Link:        &feeds.Link{Href: inputFeed.Link},
			Description: "Conors Proxy of " + inputFeed.Description,
			Author:      &feeds.Author{Name: "Reddit", Email: "reddit@example.com"},
		}

		for _, inputItem := range inputFeed.Items {

			if err != nil {
				fmt.Println(err)
			}
			outputItem := feeds.Item{
				Title:       inputItem.Title,
				Link:        &feeds.Link{Href: inputItem.Link},
				Description: inputItem.Content,
				Author:      &feeds.Author{Name: inputItem.Author, Email: "reddit@example.com"},
				Created:     inputItem.Date,
			}

			RSSXML.Add(&outputItem)

		}

		rss, _ := RSSXML.ToAtom()

		io.WriteString(w, rss)
	}

}

func main() {
	http.HandleFunc("/", allSubreddits)
	http.ListenAndServe(":8111", nil)
}
