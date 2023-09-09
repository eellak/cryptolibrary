# cryptolibrary
Αποδοτική Υλοποίηση Κρυπτοβιβλιοθήκης και επέκταση της σε blockchain  τεχνολογίες

### Σκοπιμότητα Έργου

Τα τελευταία χρόνια υπάρχει μεγάλο ενδιαφέρον για την αποδοτική υλοποίηση κρυπτογραφιών πρωτοκόλλων ώστε να μπορούν να εφαρμοστούν σε συσκευές IoT και κινητά τηλέφωνα. 
Όσο οι δικτυακές τεχνολογίες γίνονται γρηγορότερες και τα περιβάλλοντα ανάπτυξης λογισμικού γίνονται πιο απαιτητικά , υπάρχει μια εγγενής απαίτηση για ασφαλείς και αποδοτικές επικοινωνίες. Προς αυτή την κατεύθυνση προτείνουμε την επέκταση μιας ευρέως διαδεδομένης κρυπτογραφικής βιβλιοθήκης ώστε να παρέχει νέες προχωρημένες, ασφαλέστερες και αποδοτικότερες υπηρεσίες για την διαχείρισης της ταυτότητας των χρηστών με την χρήση της τεχνολογίας blockchain. 

### Περιγραφή χρησιμότητας του λογισμικού 
Θα διερευνήσουμε την πρακτική και θεωρητική πλευρά της ανάπτυξης επιτυχημένων κρυπτογραφικών βιβλιοθηκών με βάση τις ελλειπτικές καμπύλες (GNUCrypto) για την υποστήριξη υπηρεσιών διαχείρισης ταυτότητας με την χρήση της blockchain τεχνολογίας. Η κρυπτογράφηση με βάση τις ελλειπτικές καμπύλες (ECC) έχει προσελκύσει το ενδιαφέρον των προγραμματιστών καθώς παράγει πιο αποδοτικούς κρυπταλγορίθμούς και ταυτόχρονα αποτελεί την βασική τεχνολογία της Blockchain τεχνολογίας. 
Μια από τις βασικότερες βιβλιοθήκες που χρησιμοποιείται για την ανάπτυξη εργαλείων κρυπτογραφίας που βασίζονται σε ελλειπτικές καμπύλες είναι η GNU-Crypto βιβλιοθήκη. Πληθώρακρυπτογραφικών βιβλιοθηκών έχουν αναπτυχθεί που επεκτείνουν την GNU-Crypto βιβλιοθήκη ώστε να υλοποιήσουν την αντιστοίχισης πάνω σε ελλειπτικές καμπύλες([PBC], mcl], [GMT19], [NASKM08] , [MIRACL], [AMCLv2]) με βάση την GNU-Crypto βιβλιοθήκη.

### Περιγραφή Έργου 
Εστιάζουμε σε θέματα βελτιστοποίησης δομών δεδομένων και θα διερευνήσουμε την χρήση σε κρυπτογραφικές βιβλιοθήκες που υποστηρίζουν τις πράξεις σύζευξης σε ελλειπτικές καμπύλες. Στην παρούσα πρόταση θα βελτιστοποιήσουμε την GNU-Crypto βιβλιοθήκη ώστε η διεπαφή προγραμματισμού εφαρμογών του και πιο συγκεκριμένα την The Legion of the Bouncy Castle που χρησιμοποιείται ευρέως σε πληθώρα εφαρμογών για να εκτελεί ταχύτερα και αποδοτικότερα τους υπολογισμούς BLS12-461, BLS12-381 και BN254 πάνω στις ελλειπτικές καμπύλες. 

Αναλυτικότερα σχεδιάζοντας αποδοτικότερες δομές δεδομένων θα υλοποιηθεί η βιβλιοθήκη που θα πραγματοποιεί την αντιστοίχιση πάνω στις ελλειπτικές καμπύλες και θα μετρηθεί η απόδοση της βιβλιοθήκης σε δοκιμαστική εφαρμογή που χρησιμοποιεί την τεχνολογία blockchain για την διαχείριση ταυτότητας των χρηστών με βάση τον κώδικα [OLYMPUS](https://olympus-idp.readthedocs.io/en/latest/introduction.html).
Έχουμε επιλέξει να εφαρμόσουμε και να αξιολογήσουμε τις βελτιστοποιήσεις που θα αναπτυχθούν σε μια σύγχρονη βιβλιοθήκη [(OLYMPUS)](https://olympus-idp.readthedocs.io/en/latest/introduction.html) που χρησιμοποιεί blockchain τεχνολογία για την υλοποίηση κατανεμημένων υπηρεσιών διαχείρισης ταυτότητας ενώ ταυτόχρονα διατηρεί την ανωνυμία των χρηστών. 

Στην παρακάτω εικόνα περιγράφεται η αρχιτεκτονική του συστήματος για την υλοποίηση της επέκτασης της βιβλιοθήκης [OLYMPUS](https://olympus-idp.readthedocs.io/en/latest/introduction.html) και της αξιολόγησης της απόδοσης και της ευχρηστίας στην διαχείριση ταυτότητας των χρηστών.

<div align="center">
<img width="500" alt="Αρχιτεκτονική Συστήματος" src="https://github.com/eellak/cryptolibrary/assets/72886828/f56224df-d122-40af-ac7d-e29b9f69b4a8">
<p>Αρχιτεκτονική Συστήματος</p>
</div>
