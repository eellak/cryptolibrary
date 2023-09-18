package eu.olympus.Times;

import org.miracl.core.BLS12461.BIG;
import org.miracl.core.BLS12461.FP2;
import org.miracl.core.BLS12461.FP2pool;
import org.miracl.core.BLS12461.FP4;
import org.miracl.core.BLS12461.FP12;

public class maintimeFP12 {
    private FP4 fp4; // Declare FP4 object
    private FP12 fp12; // Declare FP12 object
    volatile int i = 0; // Variable for loop iteration

    public void run() {
        FP2pool pool = new FP2pool();
        FP2pool ypool = new FP2pool();

        FP2 a = new FP2(new BIG(1), new BIG(2), pool); // Create FP2 object
        FP2 b = new FP2(new BIG(3), new BIG(4), ypool); // Create FP2 object

        this.fp4 = new FP4(a, b); // Create FP4 object with FP2 objects as parameters
        this.fp12 = new FP12(new FP4(a, b)); // Create FP12 object with FP4 object as parameter

        long startTime = System.currentTimeMillis(); // Start time

        for (i = 0; i < 1000000; i++) {
            this.fp12.mul(this.fp12); // Call mul method on FP object
        }

        long endTime = System.currentTimeMillis(); // End time
        double elapsedTime = (endTime - startTime) / 1000.0; //

        System.out.println("Elapsed time for FP12 mul operation: " + elapsedTime + " seconds");
        System.out.println("Time per operation: " + (elapsedTime / 1000000.0) * 1000*1000 + " microsecond");

        // Reset start time and measure time for FP sqr operation
        startTime = System.currentTimeMillis();

        for (i = 0; i < 100000; i++) {
            this.fp12.sqr(); //
        }

        endTime = System.currentTimeMillis();
        elapsedTime = (endTime - startTime) / 1000.0;

        System.out.println("Elapsed time for FP12 sqr operation: " + elapsedTime + " seconds");
        System.out.println("Time per operation: " + (elapsedTime / 100000.0) * 1000*1000 + " microsecond");

    }

    public static void main(String[] args) {
        maintimeFP12 main = new maintimeFP12();
        main.run();
    }
}
