Η ενότητα *oidc-demo-idp* χρησιμοποιεί τον Olympus-core για τη δημιουργία ενός vIdP (που σχηματίζεται από 3 IdPs) για να εμφανίσει μια εφαρμογή ως πάροχο ταυτότητας σε ένα OIDC. Για την πλήρη υλοποίηση του παραδείγματος, απαιτείται το frontend για τις τυπικές αιτήσεις OIDC (ελέγξτε το αντίστοιχο [readme](../front/README.md)).

Για να δημιουργήσετε το module, χρησιμοποιήστε την εντολή:
>mvn install


*Σημειώστε ότι η 'mvn install' χτίζει εγκατάσταση Docker, οπότε το Docker πρέπει να εκτελείται κατά την εκτέλεση αυτής της εντολής.*
*ΜΗΝ παραλείπετε τις δοκιμές στην 'mvn install'. Οι δοκιμές είναι απαραίτητες για την κατασκευή των κλειδιών δοκιμών που μεταγλωττίζονται στις εικόνες Docker.*

Για να εκκινήσετε το IdP:
> docker compose up
