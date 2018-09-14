package ads.operator.panel.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import ui.ads.operator.panel.tools.Maps;

public class DashboardPage {

//  get:
  @FindBy(xpath = "//*[contains(@href,'/blockexplorer/nodes/')]")                                                       private WebElement NodesId;

  @FindBy(xpath = "//*[contains(@href,'/blockexplorer/blocks/')]")                                                      private WebElement BlocksId;
  @FindBy(xpath = "//*[contains(@href,'/blockexplorer/transactions/')]")                                                private WebElement TransactionsId;
  @FindBy(xpath = "//*[@href='/blockexplorer/nodes']")                                                                  private WebElement ViewAllNodes;
  @FindBy(xpath = "//*[@href='/blockexplorer/blocks']")                                                                 private WebElement ViewAllBlocks;
  @FindBy(xpath = "//*[@href='/blockexplorer/transactions']")                                                           private WebElement ViewAllTransactions;
  @FindBy(css = "[class='block_id']")                                                                                   private WebElement TransactionsBlock;
  @FindBy(css = "[class='message_id']")                                                                                 private WebElement TransactionsMessage;
  @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[3]//descendant::td[3]//descendant::a[1]")  private WebElement TransactionsMessage2;
  @FindBy(css = "[class='sender_address']")                                                                             private WebElement TransactionsFrom;
  @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[3]//descendant::td[4]//descendant::a[1]")  private WebElement TransactionsFrom2;
  @FindBy(css = "[class='target_address']")                                                                             private WebElement TransactionsTo;
  @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[3]//descendant::td[5]//descendant::a[1]")  private WebElement TransactionsTo2;
  @FindBy(css = "[class='col-md-9']")                                                                                   private WebElement test2;
  @FindBy(xpath = "//*[@class='row styled__HeaderWrapper-kockOB gCffOb']//descendant::span[3]")                         private WebElement blockexplorer;
  @FindBy(xpath = "//*[@class='breadcrumb']//descendant::a[1]")                                                         private WebElement home;
  @FindBy(xpath = "//*[@class='breadcrumb']//descendant::a[2]")                                                         private WebElement homeBlockexplorer;
  @FindBy(id="search")                                                                                                  private WebElement search;
//  Assert
@FindBy(xpath = "//*[contains(text(), 'Failed to fetch')]")                                                             private WebElement AssertFailedToFetch;
  @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::button[1]")                    private WebElement AssertNodes;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[1]//descendant::th[1]")  private WebElement AssertNodes_Id;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[1]//descendant::th[2]")  private WebElement AssertNodes_Accounts;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[1]//descendant::th[3]")  private WebElement AssertNodes_Messages;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[1]//descendant::th[4]")  private WebElement AssertNodes_Balance;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[1]//descendant::th[5]")  private WebElement AssertNodes_Status;
  @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::button[2]")                    private WebElement AssertBlocks;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[2]//descendant::th[1]")  private WebElement AssertBlocks_Id;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[2]//descendant::th[2]")  private WebElement AssertBlocks_Messages;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[2]//descendant::th[3]")  private WebElement AssertBlocks_Transactions;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[2]//descendant::th[4]")  private WebElement AssertBlocks_Time;
  @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::button[3]")                    private WebElement AssertLatestTransactions;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[3]//descendant::th[1]")  private WebElement AssertLatestTransactions_Id;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[3]//descendant::th[2]")  private WebElement AssertLatestTransactions_Block;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[3]//descendant::th[3]")  private WebElement AssertLatestTransactions_Message;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[3]//descendant::th[4]")  private WebElement AssertLatestTransactions_From;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[3]//descendant::th[5]")  private WebElement AssertLatestTransactions_To;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[3]//descendant::th[6]")  private WebElement AssertLatestTransactions_Amount;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[3]//descendant::th[7]")  private WebElement AssertLatestTransactions_Type;
    @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[3]//descendant::th[8]")  private WebElement AssertLatestTransactions_Time;

  @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::button[1]")                    private WebElement Assert_1;

  private WebDriver driver;
  private WebDriverWait wait;

  public DashboardPage(WebDriver driver) {
    this.driver = driver;
    wait = new WebDriverWait(driver, 30);
    PageFactory.initElements(driver, this);
  }


  public void dashboard(String url) {
    wait = new WebDriverWait(driver, 30);
    driver.get(url);
    int id = 1;
    wait.until(ExpectedConditions.visibilityOf(NodesId));
    String nodes_id=NodesId.getText();
    System.out.println("nodes_id:             "+nodes_id);
    wait.until(ExpectedConditions.visibilityOf(BlocksId));
    String blocks_id=BlocksId.getText();
    System.out.println("blocks_id:            "+blocks_id);
    wait.until(ExpectedConditions.visibilityOf(TransactionsId));
    String transactions_id=TransactionsId.getText();
    System.out.println("transactions_id:      "+transactions_id);
    wait.until(ExpectedConditions.visibilityOf(TransactionsBlock));
    String transactions_block=TransactionsBlock.getText();
    System.out.println("transactions_block:   "+transactions_block);
    wait.until(ExpectedConditions.visibilityOf(TransactionsMessage));
    String transactions_message=TransactionsMessage.getText();
    System.out.println("transactions_message: "+transactions_message);
    wait.until(ExpectedConditions.visibilityOf(TransactionsFrom));
    String transactions_from=TransactionsFrom.getText();
    System.out.println("transactions_from:    "+transactions_from);
    wait.until(ExpectedConditions.visibilityOf(TransactionsTo));
    String transactions_to=TransactionsTo.getText();
    System.out.println("transactions_to:      "+transactions_to);
    Maps.createId();
    Maps.id("id", id);
    Maps.createDashboard();
    Maps.dashboard1("node_id", nodes_id);
    Maps.dashboard2("block_id", blocks_id);
    Maps.dashboard3("transactions_id", transactions_id);
    Maps.dashboard4("transactions_block", transactions_block);
    Maps.dashboard5("transactions_message", transactions_message);
    Maps.dashboard6("transactions_from", transactions_from);
    Maps.dashboard7("transactions_to", transactions_to);
    url=driver.getCurrentUrl();
    System.out.println(url);
  }

  private void url(){
    String url=driver.getCurrentUrl();
    System.out.println(url);
  }
  public void firstNode() {
    wait.until(ExpectedConditions.visibilityOf(NodesId));
    String getNodesId=NodesId.getText();
    NodesId.click();
    System.out.println("Click - NodeId [ "+getNodesId+" ]");
    url();
  }
  public void firstBlock() {
    wait.until(ExpectedConditions.visibilityOf(BlocksId));
    String getBlockId=BlocksId.getText();
    BlocksId.click();
    System.out.println("Click - BlockID [ "+getBlockId+" ]");
    url();
  }
  public void firstTransaction() {
    wait.until(ExpectedConditions.visibilityOf(TransactionsId));
    String getTransactionsId=TransactionsId.getText();
    TransactionsId.click();
    System.out.println("Click - TransactionsId [ "+getTransactionsId+" ]");
    url();
  }

  public void viewAllNode() {
    wait.until(ExpectedConditions.visibilityOf(ViewAllNodes));
    ViewAllNodes.click();
    System.out.println("Click - ViewAllNodes");
    url();
  }
  public void viewAllBlock() {
    wait.until(ExpectedConditions.visibilityOf(ViewAllBlocks));
    ViewAllBlocks.click();
    System.out.println("Click - ViewAllBlocks");
    url();
  }
  public void viewAllTransaction() {
    wait.until(ExpectedConditions.visibilityOf(ViewAllTransactions));
    ViewAllTransactions.click();
    System.out.println("Click - ViewAllTransaction");
    url();
  }

  public void firstFrom() {
    wait.until(ExpectedConditions.visibilityOf(TransactionsFrom2));
    TransactionsFrom2.click();
    System.out.println("Click - TransactionsFrom2");
    url();
  }

  public void search(String search_x) {
    wait.until(ExpectedConditions.visibilityOf(search));
    search.sendKeys(search_x);
    driver.findElement(By.id("search")).sendKeys(Keys.ENTER);
    System.out.println("Click - Search [ "+search_x+" ]");
    url();
  }

  public void firstMessage() {
    wait.until(ExpectedConditions.visibilityOf(TransactionsMessage2));
    TransactionsMessage2.click();
    System.out.println("Click - TransactionsMessage");
    url();
  }

  public void firstTo() {
    wait.until(ExpectedConditions.visibilityOf(TransactionsTo2));
    TransactionsTo2.click();
    System.out.println("Click - TransactionsTo");
    url();
  }

  public void detailedDataHomePage(){
    wait.until(ExpectedConditions.visibilityOf(AssertNodes));
    Assert.assertEquals("Nodes", AssertNodes.getText());
    System.out.print("Assert Nodes               - ");
    wait.until(ExpectedConditions.visibilityOf(AssertNodes_Id));
    Assert.assertEquals("Id", AssertNodes_Id.getText());
    System.out.print("Id, ");
    wait.until(ExpectedConditions.visibilityOf(AssertNodes_Accounts));
    Assert.assertEquals("Accounts", AssertNodes_Accounts.getText());
    System.out.print("Accounts, ");
    wait.until(ExpectedConditions.visibilityOf(AssertNodes_Messages));
    Assert.assertEquals("Messages", AssertNodes_Messages.getText());
    System.out.print("Messages, ");
    wait.until(ExpectedConditions.visibilityOf(AssertNodes_Balance));
    Assert.assertEquals("Balance", AssertNodes_Balance.getText());
    System.out.print("Balance, ");
    wait.until(ExpectedConditions.visibilityOf(AssertNodes_Status));
    Assert.assertEquals("Status", AssertNodes_Status.getText());
    System.out.println("Status");

    wait.until(ExpectedConditions.visibilityOf(AssertBlocks));
    Assert.assertEquals("Blocks", AssertBlocks.getText());
    System.out.print("Assert Blocks              - ");
    wait.until(ExpectedConditions.visibilityOf(AssertBlocks_Id));
    Assert.assertEquals("Id", AssertBlocks_Id.getText());
    System.out.print("Id, ");
    wait.until(ExpectedConditions.visibilityOf(AssertBlocks_Messages));
    Assert.assertEquals("Messages", AssertBlocks_Messages.getText());
    System.out.print("Messages, ");
    wait.until(ExpectedConditions.visibilityOf(AssertBlocks_Transactions));
    Assert.assertEquals("Transactions", AssertBlocks_Transactions.getText());
    System.out.print("Transactions, ");
    wait.until(ExpectedConditions.visibilityOf(AssertBlocks_Time));
    Assert.assertEquals("Time", AssertBlocks_Time.getText());
    System.out.println("Time");

    wait.until(ExpectedConditions.visibilityOf(AssertLatestTransactions));
    Assert.assertEquals("Latest transactions", AssertLatestTransactions.getText());
    System.out.print("Assert Latest transactions - ");
    wait.until(ExpectedConditions.visibilityOf(AssertLatestTransactions_Id));
    Assert.assertEquals("Id", AssertLatestTransactions_Id.getText());
    System.out.print("Id, ");
    wait.until(ExpectedConditions.visibilityOf(AssertLatestTransactions_Block));
    Assert.assertEquals("Block", AssertLatestTransactions_Block.getText());
    System.out.print("Block, ");
    wait.until(ExpectedConditions.visibilityOf(AssertLatestTransactions_Message));
    Assert.assertEquals("Message", AssertLatestTransactions_Message.getText());
    System.out.print("Message, ");
    wait.until(ExpectedConditions.visibilityOf(AssertLatestTransactions_From));
    Assert.assertEquals("From", AssertLatestTransactions_From.getText());
    System.out.print("From, ");
    wait.until(ExpectedConditions.visibilityOf(AssertLatestTransactions_To));
    Assert.assertEquals("To", AssertLatestTransactions_To.getText());
    System.out.print("To, ");
    wait.until(ExpectedConditions.visibilityOf(AssertLatestTransactions_Amount));
    Assert.assertEquals("Amount", AssertLatestTransactions_Amount.getText());
    System.out.print("Amount, ");
    wait.until(ExpectedConditions.visibilityOf(AssertLatestTransactions_Type));
    Assert.assertEquals("Type", AssertLatestTransactions_Type.getText());
    System.out.print("Type, ");
    wait.until(ExpectedConditions.visibilityOf(AssertLatestTransactions_Time));
    Assert.assertEquals("Time", AssertLatestTransactions_Time.getText());
    System.out.println("Time");
  }

  public void homeBlockexplorer_1() {
    System.out.println("<<<<<           blockexplorer          >>>>>");
    firstNode();
    wait.until(ExpectedConditions.visibilityOf(blockexplorer));
    blockexplorer.click();
    firstBlock();
    wait.until(ExpectedConditions.visibilityOf(blockexplorer));
    blockexplorer.click();
    firstTransaction();
    wait.until(ExpectedConditions.visibilityOf(blockexplorer));
    blockexplorer.click();
    firstMessage();
    wait.until(ExpectedConditions.visibilityOf(blockexplorer));
    blockexplorer.click();
    firstFrom();
    wait.until(ExpectedConditions.visibilityOf(blockexplorer));
    blockexplorer.click();
    firstTo();
    wait.until(ExpectedConditions.visibilityOf(blockexplorer));
    blockexplorer.click();
    viewAllNode();
    wait.until(ExpectedConditions.visibilityOf(blockexplorer));
    blockexplorer.click();
    viewAllBlock();
    wait.until(ExpectedConditions.visibilityOf(blockexplorer));
    blockexplorer.click();
    viewAllTransaction();
    wait.until(ExpectedConditions.visibilityOf(blockexplorer));
    blockexplorer.click();
  }

  public void homeBlockexplorer_2() {
    System.out.println("<<<<<           home /           >>>>>>");
    firstNode();
    wait.until(ExpectedConditions.visibilityOf(home));
    home.click();
    firstBlock();
    wait.until(ExpectedConditions.visibilityOf(home));
    home.click();
    firstTransaction();
    wait.until(ExpectedConditions.visibilityOf(home));
    home.click();
    firstMessage();
    wait.until(ExpectedConditions.visibilityOf(home));
    home.click();
    firstFrom();
    wait.until(ExpectedConditions.visibilityOf(home));
    home.click();
    firstTo();
    wait.until(ExpectedConditions.visibilityOf(home));
    home.click();
    viewAllNode();
    wait.until(ExpectedConditions.visibilityOf(home));
    home.click();
    viewAllBlock();
    wait.until(ExpectedConditions.visibilityOf(home));
    home.click();
    viewAllTransaction();
    wait.until(ExpectedConditions.visibilityOf(home));
    home.click();
  }

  public void homeBlockexplorer_3() {
    System.out.println("<<<<<           home / blockexplorer           >>>>>");
    firstNode();
    wait.until(ExpectedConditions.visibilityOf(homeBlockexplorer));
    homeBlockexplorer.click();
    firstBlock();
    wait.until(ExpectedConditions.visibilityOf(homeBlockexplorer));
    homeBlockexplorer.click();
    firstTransaction();
    wait.until(ExpectedConditions.visibilityOf(homeBlockexplorer));
    homeBlockexplorer.click();
    firstMessage();
    wait.until(ExpectedConditions.visibilityOf(homeBlockexplorer));
    homeBlockexplorer.click();
    firstFrom();
    wait.until(ExpectedConditions.visibilityOf(homeBlockexplorer));
    homeBlockexplorer.click();
    firstTo();
    wait.until(ExpectedConditions.visibilityOf(homeBlockexplorer));
    homeBlockexplorer.click();
    viewAllNode();
    wait.until(ExpectedConditions.visibilityOf(homeBlockexplorer));
    homeBlockexplorer.click();
    viewAllBlock();
    wait.until(ExpectedConditions.visibilityOf(homeBlockexplorer));
    homeBlockexplorer.click();
    viewAllTransaction();
    wait.until(ExpectedConditions.visibilityOf(homeBlockexplorer));
    homeBlockexplorer.click();
  }

  public void searchCorrect() {
    String[] myList = {"0040","5B8E4000","0003:00000C55:0001","5B965200","0003:00000C55","0003-00000002-FFAE","001B-00000000-D99B"};
    for (String List : myList){
      wait.until(ExpectedConditions.visibilityOf(search));
      driver.findElement(By.id("search")).sendKeys(Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE);
      search.sendKeys(List);
      driver.findElement(By.id("search")).sendKeys(Keys.ENTER);
      System.out.println("Click - Search [ "+List+" ]");
      url();
    }
  }

  public void searchInCorrect() {
    String[] myList = {"F040","004.","004ą","123456","FB8E4000","5B.E4000","55B8E400Ą","F003:00000C55:0001","0003-00000C55:0001",
      "0003:00000C55-0001","0003;00000C55;0001","0003_00000C55_0001","0003=00000C55=0001","000300000C550001","FB965200",
      "FB965200","FB965200","F003:00000C55","F003-00000C55","F003;00000C55","F003-00000002-FFAE","F01B-00000000-D99B"};
    for (String List : myList){
      wait.until(ExpectedConditions.visibilityOf(search));
      driver.findElement(By.id("search")).sendKeys(Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE,Keys.BACK_SPACE);
      search.sendKeys(List);
      driver.findElement(By.id("search")).sendKeys(Keys.ENTER);
      wait.until(ExpectedConditions.visibilityOf(AssertFailedToFetch));
      System.out.println("Click - Search [ "+List+" ]");
      url();
    }
  }
}
