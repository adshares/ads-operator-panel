package ui.ads.operator.panel.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import ui.ads.operator.panel.tools.Maps;

public class DashboardPage {

//  get:
  @FindBy(xpath = "//*[contains(@href,'/blockexplorer/nodes/')]")                                                       private WebElement NodesId;
  @FindBy(xpath = "//*[contains(@href,'/blockexplorer/blocks/')]")                                                      private WebElement BlocksId;
  @FindBy(xpath = "//*[contains(@href,'/blockexplorer/transactions/')]")                                                private WebElement TransactionsId;
  @FindBy(css = "[class='block_id']")                                                                                   private WebElement TransactionsBlock;
  @FindBy(css = "[class='message_id']")                                                                                 private WebElement TransactionsMessage;
  @FindBy(css = "[class='sender_address']")                                                                             private WebElement TransactionsFrom;
  @FindBy(xpath = "//*[@class='styled__BlockexplorerWrapper-kqUyRv byCFeK']//descendant::table[3]//descendant::td[4]//descendant::a[1]")  private WebElement TransactionsFrom2;
  @FindBy(css = "[class='target_address']")                                                                             private WebElement TransactionsTo;
  @FindBy(xpath = "//*[@href='/blockexplorer/nodes']")                                                                  private WebElement ViewAllNodes;
  @FindBy(css = "[class='col-md-9']")                                                                                   private WebElement test2;
  @FindBy(xpath = "//*[@href='/blockexplorer']")                                                                        private WebElement home;
  @FindBy(id="search")                                                                                                  private WebElement search;

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
  }

  public void firstNode() {
    wait.until(ExpectedConditions.visibilityOf(NodesId));
    NodesId.click();
    System.out.println("NodeId - Click");
  }
  public void viewAllNode() {
    wait.until(ExpectedConditions.visibilityOf(ViewAllNodes));
    ViewAllNodes.click();
    System.out.println("ViewAllNodes - Click");
  }

  public void firstFrom() {
    wait.until(ExpectedConditions.visibilityOf(TransactionsFrom2));
    TransactionsFrom2.click();
    System.out.println("TransactionsFrom2 - Click");
  }

  public void search(String search_x) {
    wait.until(ExpectedConditions.visibilityOf(search));
    search.sendKeys(search_x);
    driver.findElement(By.id("search")).sendKeys(Keys.ENTER);
    System.out.println("Search - Click ["+search_x+"]");
  }
}
