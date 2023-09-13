Το κύριο μέρος της κρυπτοβιβλιοθήκης(Olympus), που έχουν δημιουργηθεί μεθόδοι δεδομένων pool για τις αντίστοιχες κλάσεις FP2, FP4, FP12 ECP, ECP2 βρίσκεται στο module (*core*), το οποίο περιέχει κώδικα που υλοποιεί έναν πελάτη, έναν διακομιστή (μερικό IdP) και έναν επαληθευτή (Relying Party). 
Πρέπει να σημειώσουμε ότι η βάση κώδικα του πυρήνα (*core*) περιλαμβάνει κάποιο κώδικα πελάτη και IdP που προορίζεται κυρίως για σύγκριση/δείγματα σύγκρισης (τα στοιχεία password jwt και distributed rsa).

Για να δημιουργήσετε αυτό το module, χρησιμοποιούμε τις εντολές:
>mvn clean
>
>mvn install

*Πρέπει να σημειώσουμε ότι η εντολή 'mvn clean' είναι απαραίτητη για την εγκατάσταση της εξάρτησης jar του MIRACL στο τοπικό αποθετήριο m2 προκειμένου να χτιστεί το έργο.*