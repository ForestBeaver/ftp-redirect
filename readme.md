## ftp-redirect

Need to open links in Safari while in Chrome? Want to offer PWA add-to-homescreen from browsers other than Safari?
This project demonstrates how to launch Safari using an ftp:// URL and load a simple HTML/JS script which
will redirect Safari so an arbitrary URL. 


## Description
iOS doesn't provide a method for launching a link in Safari while use an alternative browser, such as Chrome. 
This makes it impossible to redirect to Safari for PWA installs. A loophole is that ftp:// links from any browser 
will open in Safari. This makes it possible to load a small HTML/JS script that redirects to the target page.