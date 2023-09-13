//package eu.olympus.Times;
//
//import org.miracl.core.BLS12461.FP2;
//
//public class Main_Time2 {
//    private FP2 fp2Object;
//    private FP2 fp2; // dilwsi metablitis FP2 class
//    volatile int i=0;
//    public Main_Time2() {
//        // Initialize an instance of FP2
//        this.fp2Object = new FP2();
//    }
//
//    public void run() {
//        FP2 y = new FP2(); // Initialize another instance of FP2 for the parameter of mul method
//        this.fp2 = new FP2();
//        long startTime = System.currentTimeMillis();
//
//        for (i = 0; i < 1000000; i++) {
//            this.fp2.mul(y); // kalesma methodou mul 100.000
//        }
//
//        long endTime = System.currentTimeMillis();
//        double elapsedTime = (endTime - startTime)/1000.0;
//        System.out.println("Elapsed time: " + elapsedTime + " in seconds");
//        System.out.println("Time operation: "+ (elapsedTime/1000000.0)*1000);
//
//        startTime = System.currentTimeMillis(); //
//
//        for (i = 0; i < 100000; i++) {
//            this.fp2.sqr(); // kalesma methodou mul 100.000
//        }
//        endTime = System.currentTimeMillis(); // trexousa wra se nanotime
//        elapsedTime = (endTime - startTime)/1000.0; // convert nanoseconds to seconds
//        System.out.println("Elapsed time: " + elapsedTime + " in seconds");
//        System.out.println("Time operation: "+ (elapsedTime/100000.0)*1000);
//    }
//
//
//    public static void main(String[] args) {
//        Main_Time2 main = new Main_Time2(); // Create an instance of Main
//        main.run(); // Call the run method to measure the elapsed time
//    }
//}
