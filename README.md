# Santamixer
A simple Secret Santa generator with exclusion groups and SendGrid email integration. 
Born out of necessity for a fully anonymous secret santa generator which can avoid matching couples.

# Features

  - Exclusion groups: prevent players in the same group from matching with each other
  - SendGrid email integration
  - Configurable email body with placeholder support

# Usage
- Install NodeJS and NPM
- Checkout

```sh
$ cd santamixer
$ npm install
$ npm start
```

# Configuration
## santa.json
This file contains the list of players. Example json:

- Only 'name', 'group' and 'email' properties are mandatory.
- Players with the same group value will not be matched (unless its impossible to do so)
- You can add any parameters you like ('amount' in this case)
- Any of these parameters can be injected into the email body with placeholders (example below)
```json
[
    {
       "name": "Fox",
       "group": "1",
       "email": "fox@example.com",
       "amount": "2000"
    },
    {
       "name": "Chinthi",
       "group": "1",
       "email": "chinthi@example.com",
       "amount": "2000"
    },
    {
       "name": "Chana",
       "group": "",
       "email": "chana@example.com",
       "amount": "2000"
    },
    {
        "name": "Flynn",
        "group": "",
        "email": "flynn@example.com",
        "amount": "2000"
     }
]
```

## config.json

```json
{
    "printMatches": true,
    "sendMails": false,
    "shuffleAttempts": 100,
    "sendOnShuffleFail": false,
    "api_key": "",
    "from": "santa@example.com",
    "subject": "You're a Santa!",
    "message": "You will be gifting <strong> {name}! </strong><br><br> Keep the gift under <strong> {amount} </strong>"
}
```
| key  | description | 
| ------------- | ------------- |
| printMatches  | Prints the matched results to console if enabled  |
| sendMails  | Sends emails after matching if enabled  |
| shuffleAttempts  | Maximum number of times to reshuffle if exclusion rules are not met  |
| sendOnShuffleFail  | Proceeds to send mails even if shuffle fails after shuffleAttempts  |
| api_key  | SendGrid API Key. See https://sendgrid.com/docs/ui/account-and-settings/api-keys/#creating-an-api-key  |
| from  | SendGrid verified email address used for sending mails   |
| subject  | email subject line  |
| message  | email body. Supports html and placeholders. Eg. adding {name} will pull the 'name' property from player object in santa.json  |


### Contributions welcome!

License
----

MIT

*03F FTW!*
