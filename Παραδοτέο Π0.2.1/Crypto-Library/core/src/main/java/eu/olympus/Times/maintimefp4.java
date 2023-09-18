package eu.olympus.Times;

import org.miracl.core.BLS12461.BIG;
import org.miracl.core.BLS12461.FP2;
import org.miracl.core.BLS12461.FP2pool;
import org.miracl.core.BLS12461.FP4;

public class maintimefp4 {
    private FP4 fp4; // Declare FP4 object
    volatile int i = 0; // Variable for loop iteration

    public void run() {
        FP2pool pool = new FP2pool();
        FP2pool ypool = new FP2pool();

        FP2 a = new FP2(new BIG(1), new BIG(2), pool); // Create FP2 object
        FP2 b = new FP2(new BIG(3), new BIG(4), ypool); // Create FP2 object

        this.fp4 = new FP4(a, b); // Create FP4 object with FP2 objects as parameters

        long startTime = System.currentTimeMillis(); // Start time

        for (i = 0; i < 1000000; i++) {
            this.fp4.mul(this.fp4); // Call mul method on FP4 object
        }

        long endTime = System.currentTimeMillis(); // End time
        double elapsedTime = (endTime - startTime) / 1000.0; //

        System.out.println("Elapsed time for FP4 mul operation: " + elapsedTime + " seconds");
        System.out.println("Time per operation: " + (elapsedTime / 1000000.0) * 1000 + " milliseconds");

        // Reset start time and measure time for sqr operation
        startTime = System.currentTimeMillis();

        for (i = 0; i < 100000; i++) {
            this.fp4.sqr(); // Call sqr method on FP4 object
        }

        endTime = System.currentTimeMillis();
        elapsedTime = (endTime - startTime) / 1000.0;

        System.out.println("Elapsed time for FP4 sqr operation: " + elapsedTime + " seconds");
        System.out.println("Time per operation: " + (elapsedTime / 100000.0) * 1000 + " milliseconds");
    }

    public static void main(String[] args) {
        maintimefp4 main = new maintimefp4();
        main.run();
    }
}
