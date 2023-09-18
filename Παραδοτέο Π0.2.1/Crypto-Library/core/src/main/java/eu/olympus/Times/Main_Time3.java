package eu.olympus.Times;

import org.miracl.core.BLS12461.BIG;
import org.miracl.core.BLS12461.FP2;

public class Main_Time3 {
    public static void main(String[] args) {
        // Create a new instance of the FP2 class
        FP2 fp2 = new FP2(new BIG());

        // Measure the time it takes to execute the mul method
        long startTime = System.currentTimeMillis();
        fp2.mul(fp2);
        long endTime = System.currentTimeMillis();
        double elapsedTime = (endTime - startTime)/1000.0;

        // Print the elapsed time
        System.out.println("Elapsed time: " + elapsedTime + " in seconds");
        System.out.println("Elapsed time: " + elapsedTime + " in seconds");
        System.out.println("Time operation: "+ (elapsedTime/1000000.0)*1000);
    }
}
