package ui.ads.operator.panel;

import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import ui.ads.operator.panel.pages.DashboardPage;
import ui.ads.operator.panel.pages.block.BlockPage;
import ui.ads.operator.panel.pages.node.NodePage;
import ui.ads.operator.panel.pages.transaction.FromPage;
import ui.ads.operator.panel.pages.transaction.MessagePage;
import ui.ads.operator.panel.pages.transaction.ToPage;
import ui.ads.operator.panel.pages.transaction.TransactionPage;
import ui.ads.operator.panel.setup.BrowserTestCase;
import ui.ads.operator.panel.tools.Maps;

public class Blockexplorer extends BrowserTestCase {

  private String url_panel = "https://operator.e11.click/blockexplorer";
  private String url_wiremock = "http://localhost:3000/blockexplorer";
  private String url=url_wiremock;

  private String search_node_0 = "F000";
  private String search_node_1 = "0001";
  private String search_node_3 = "0003";
  private String search_block_0 = "F0000000";
  private String search_block_1 = "5B854600";
  private String search_transaction_0 = "F001:00000001:0001";
  private String search_transaction_1 = "0020:00000E79:0001";
  private String search_message_0 = "F001:00000001";
  private String search_message_1 = "0003:00000C55";
  private String search_from_0 = "F001-00000001-0001";
  private String search_from_1 = "001B-00000000-D99B";


  private DashboardPage dashboardPage;
  private NodePage nodePage;
  private BlockPage blockPage;
  private TransactionPage transactionPage;
  private MessagePage messagePage;
  private FromPage fromPage;
  private ToPage toPage;

  @BeforeTest
  public void setUp() {
    Maps.createUrl();
    Maps.url("url", url);
  }

  @Test
  public void dashboard() {
    System.out.println("---------- dashboard website ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.dashboard(url);
  }

  @Test
  public void firstNode() {
    System.out.println("---------- firstNode ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.firstNode();
  }
  @Test
  public void firstBlock() {
    System.out.println("---------- firstBlock ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.firstBlock();
  }
  @Test
  public void firstTransaction() {
    System.out.println("---------- firstTransaction ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.firstTransaction();
  }
  @Test
  public void firstMessage() {
    System.out.println("---------- firstMessage ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.firstMessage();
  }
  @Test
  public void firstFrom() {
    System.out.println("---------- firstFrom ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.firstFrom();
  }
  @Test
  public void firstTo() {
    System.out.println("---------- firstFrom ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.firstTo();
  }

  @Test
  public void viewAllNode() {
    System.out.println("---------- viewAllNode ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.viewAllNode();
  }
  @Test
  public void viewAllBlock() {
    System.out.println("---------- viewAllBlock ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.viewAllBlock();
  }
  @Test
  public void viewAllTransaction() {
    System.out.println("---------- viewAllTransaction ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.viewAllTransaction();
  }

  @Test
  public void search() {
    System.out.println("---------- search ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_node_1);
  }

  //  node
  @Test
  public void detailedDataNode() {
    System.out.println("---------- TC_1 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_node_1);
    nodePage = new NodePage(driver);
    nodePage.detailedDataNode();
  }

  @Test
  public void sortingAccountsInNode() {
    System.out.println("---------- TC_2 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_node_1);
    nodePage = new NodePage(driver);
    nodePage.sortingSccountsInNode();
  }

  @Test
  public void searchForANode() {
    System.out.println("---------- TC_3 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_node_3);
    nodePage = new NodePage(driver);
    nodePage.searchForANode();
  }

  @Test
  public void nodeSearchnNoPosition() {
    System.out.println("---------- TC_4 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_node_0);
    nodePage = new NodePage(driver);
    nodePage.nodeSearchnNoPosition();
  }

  @Test
  public void sortingNodes() {
    System.out.println("---------- TC_5 ----------");
    nodePage = new NodePage(driver);
    nodePage.sortingNodes();
  }

  //  block
  @Test
  public void detailedDataBlock() {
    System.out.println("---------- TC_6 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_block_1);
    blockPage = new BlockPage(driver);
    blockPage.detailedDataBlock();
  }
  @Test
  public void sortingSccountsInBlock() {
    System.out.println("---------- TC_7 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_block_1);
    blockPage = new BlockPage(driver);
    blockPage.sortingSccountsInBlock();
  }
  @Test
  public void searchForABlock() {
    System.out.println("---------- TC_8 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_block_1);
    blockPage = new BlockPage(driver);
    blockPage.searchForABlock();
  }
  @Test
  public void blockSearchnNoPosition() {
    System.out.println("---------- TC_9 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_block_0);
    blockPage = new BlockPage(driver);
    blockPage.blockSearchnNoPosition();
  }
  @Test
  public void sortingBlocks() {
    System.out.println("---------- TC_10 ----------");
    blockPage = new BlockPage(driver);
    blockPage.sortingBlocks();
  }
//  transaction
  @Test
  public void detailedDataTransaction() {
    System.out.println("---------- TC_11 ----------");
    transactionPage = new TransactionPage(driver);
    transactionPage.detailedDataTransaction();
  }
  @Test
  public void searchTransaction() {
    System.out.println("---------- TC_12 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_transaction_1);
    transactionPage = new TransactionPage(driver);
    transactionPage.detailedDataTransaction();
  }
  @Test
  public void searchTransactionNoPosition() {
    System.out.println("---------- TC_13 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_transaction_0);
    transactionPage = new TransactionPage(driver);
    transactionPage.searchTransactionNoPosition();
  }
  @Test
  public void sortingTransactions() {
    System.out.println("---------- TC_14 ----------");
    transactionPage = new TransactionPage(driver);
    transactionPage.sortingTransactions();
  }
  @Test
  public void detailedDataMessage() {
    System.out.println("---------- TC_15 ----------");
    messagePage = new MessagePage(driver);
    messagePage.detailedDataMessage();
  }
  @Test
  public void sortingTransactionsInMessage() {
    System.out.println("---------- TC_16 ----------");
    messagePage = new MessagePage(driver);
    messagePage.sortingTransactionsInMessage();
  }
  @Test
  public void messageSearchn() {
    System.out.println("---------- TC_17 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_message_1);
    messagePage = new MessagePage(driver);
    messagePage.detailedDataMessage();
  }
  @Test
  public void searchMessageNoPosition() {
    System.out.println("---------- TC_18 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_message_0);
    messagePage = new MessagePage(driver);
    messagePage.searchMessageNoPosition();
  }

//  transaction_from
  @Test
  public void detailedDataFrom() {
    System.out.println("---------- TC_19 ----------");
    fromPage = new FromPage(driver);
    fromPage.detailedDataFrom();
  }
  @Test
  public void sortingTransactionsInAccount() {
    System.out.println("---------- TC_20 ----------");
    fromPage = new FromPage(driver);
    fromPage.sortingTransactionsInAccount();
  }
  @Test
  public void fromSearchn() {
    System.out.println("---------- TC_21 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_from_1);
    fromPage = new FromPage(driver);
    fromPage.detailedDataFrom();
  }
  @Test
  public void fromSearchnNoPosition() {
    System.out.println("---------- TC_22 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.search(search_from_0);
    fromPage = new FromPage(driver);
    fromPage.searchFromNoPosition();
  }
  //  transaction_to
  @Test
  public void detailedDataTo() {
    System.out.println("---------- TC_23 ----------");
    toPage = new ToPage(driver);
    toPage.detailedDataTo();
  }
  //  dashboard
  @Test
  public void detailedDataHomePage() {
    System.out.println("---------- TC_24 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.detailedDataHomePage();
  }
  @Test
  public void homeBlockexplorer() {
    System.out.println("---------- TC_25 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.homeBlockexplorer_1();
    dashboardPage.homeBlockexplorer_2();
    dashboardPage.homeBlockexplorer_3();
  }
  @Test
  public void searchCorrect() {
    System.out.println("---------- TC_26 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.searchCorrect();
  }
  @Test
  public void searchInCorrect() {
    System.out.println("---------- TC_27 ----------");
    dashboardPage = new DashboardPage(driver);
    dashboardPage.searchInCorrect();
  }
  @Test
  public void iconNode() {
    System.out.println("---------- TC_28 ----------");
    nodePage = new NodePage(driver);
    nodePage.iconNode();
  }
  @Test
  public void iconTransactions() {
    System.out.println("---------- TC_29 ----------");
    transactionPage = new TransactionPage(driver);
    transactionPage.iconTransactions();
  }
}
