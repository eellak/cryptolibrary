package eu.olympus.Times;

import eu.olympus.util.pairingBLS461.Group2ElementBLS461;
import org.miracl.core.BLS12461.*;
import eu.olympus.util.pairingInterfaces.Group2Element;

public class maintime {
    private FP2 fp2; // dilwsi metablitis FP2 class
    volatile int i=0;//na ektelei ola ta vimata to for loop



    public void run() {

        FP2pool pool=new FP2pool();
        FP2pool ypool=new FP2pool();

        this.fp2 = new FP2(new BIG(1), new BIG(2), pool);

        FP2 y= new FP2(new BIG(3), new BIG(4),ypool); // create a new FP2 object with the constructor parameters

        long startTime = System.currentTimeMillis(); //

        for (i = 0; i < 1000000; i++) {
            this.fp2.mul(y); // kalesma methodou mul 100.000
        }
        long endTime = System.currentTimeMillis(); // trexousa wra se nanotime
        double elapsedTime = (endTime - startTime)/1000.0; // convert nanoseconds to seconds

        System.out.println("Elapsed time: " + elapsedTime + " in seconds");
        System.out.println("Time operation: "+ (elapsedTime/1000000.0)*1000);
//erwtisi basia gia metrisi ta parakatw

        startTime = System.currentTimeMillis(); //
//        FP W_1=new FP(1);
//        FP W_3=new FP(1);
//        FP MB=new FP(1);

        for (i = 0; i < 100000; i++) {
            this.fp2.sqr(
            ); // kalesma methodou mul 100.000
        }
         endTime = System.currentTimeMillis(); // trexousa wra se nanotime
       elapsedTime = (endTime - startTime)/1000.0; // convert nanoseconds to seconds
        System.out.println("Elapsed time: " + elapsedTime + " in seconds");
        System.out.println("Time operation: "+ (elapsedTime/10000.0)*1000);

    }

    public static void main(String[] args) {

        maintime main = new maintime();

//        main.fp2 = new FP2(new BIG(1), new BIG(2), big_pool, dbig_pool, fp_pool);
        main.run();
    }
}
